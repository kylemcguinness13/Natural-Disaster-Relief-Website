import React, { useState, useEffect} from 'react';

function Donation_Requests() {
    const [showForm, setShowForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [events, setEvents] = useState([]);
    const [requests, setRequests] = useState([]);
    const [donationAmount, setDonationAmount] = useState(0);
    const [refreshTable, setRefreshTable] = useState(false);

    const handleFormToggle = () => {
        setShowForm(!showForm);
        if (!categories.length) {
            fetchCategories();
            fetchEvents();
        }
    };

    useEffect(() => {
      fetch("http://localhost:3000/api/requests/getrequests")
          .then((response) => response.json())
          .then((data) => setRequests(data))
          .catch((error) => console.error(error));

      setRefreshTable(false);
    }, [refreshTable]);

    const fetchCategories = () => {
        fetch("http://localhost:3000/api/requests/getcategories")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchEvents = () => {
      fetch("http://localhost:3000/api/events/getevents")
        .then((response) => response.json())
        .then((data) => setEvents(data))
        .catch((error) => console.error(error));
    }

    const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const requestData = {
          EventId: formData.get('event'),
          Category: formData.get('category'),
          RequestQuantity: formData.get('quantity'),
          RequestUrgency: formData.get('urgency'),
          RequestStatus: "1",
          UserId : localStorage.getItem("id") // set this based on user
      };
  
      const resp = await fetch("http://localhost:3000/api/requests/createrequest", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
      })
      
      const data = await resp.json();
      if(!resp.ok) throw new Error(`Error: ${response.status} - ${data.Result}`);
      else
      {
        event.target.reset();
        setShowForm(false);
        setRefreshTable(true);
      }
    };

    const handleDonation = async (request, amount) => {
      //handle the donation 
      const requestQuantity = parseInt(request.RequestQuantity);
      if(amount > requestQuantity)
      {
        alert("The donation quanity is greater than the requested quantity");
      }
      else
      {
        const quantityData = {
          RequestQuantity : requestQuantity.toString(), 
          Amount : amount.toString(),
          RequestId : request.RequestId,
          UserId : localStorage.getItem("id") //set this based on user
        };
        const resp = await fetch("http://localhost:3000/api/requests/updaterequest", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(quantityData),
        })
        const data = await resp.json();
        if(!resp.ok) throw new Error(`Error: ${response.status} - ${data.Result}`);
        else{
          alert("Donation Successful");
          setRefreshTable(true);
        }
      }

    };

    return (
        <div>
          <style>
          {`
              .create-request-btn {
                  background-color: green;
                  color: white;
                  padding: 15px 30px; /* Increase padding for a bigger button */
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                  transition: background-color 0.3s; /* Smooth transition for hover effect */
              }

              .create-request-btn:hover {
                  background-color: darkgreen; /* Dark green color on hover */
              }
          `}
          </style>
            <button onClick={handleFormToggle} className="create-request-btn">Create Donation Request</button>
            {showForm && (
                <form onSubmit={handleSubmit} className="donation-form">
                    {(
                        <>
                            <style>
                                {`
                                    .form-group {
                                        color: black;
                                    }
                                    .form-group label {
                                        color: white;
                                    }
                                `}
                            </style>
                            <div className="form-group">
                                <label>Category:</label>
                                <select name="category" required>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.Category}>{category.Category} : {category.CategoryDescription}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group" color="black">
                                <label>Quantity:</label>
                                <input type="number" name = "quantity" required min="1"/>
                            </div>
                            <div className="form-group">
                                <label>Urgency:</label>
                                <select name= "urgency" required>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="2">4</option>
                                    <option value="3">5</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Disaster Event:</label>
                                <select name = "event" required>
                                    {events.map((event, index) => (
                                        <option key={index} value={event.EventId}>{event.EventName}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="submit-btn">Submit</button>
                        </>
                    )}
                </form>
            )}
            <div className="bg-slate-800 text-white">
              <style>
              {`
                  .donate-request-btn {
                      background-color: blue;
                      color: white;
                      padding: 5px 10px;
                      border: none;
                      border-radius: 5px;
                      cursor: pointer;
                  }

                  .donate-request-btn:hover {
                      background-color: darkblue;
                  }
                  .form-group {
                    color: black;
                  }
              `}
              </style>
                <table className="border w-full">
                    <thead>
                        <tr>
                            <th className="p-2 border">Recipient Email</th>
                            <th className="p-2 border">Disaster Event</th>
                            <th className="p-2 border">Item Requsted</th>
                            <th className="p-2 border">Request Quantity</th>
                            <th className="p-2 border">Request Urgency</th>
                            <th className="p-2 border">Fulfill Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.RequestId}>
                                <td className="p-2 border">{request.Email}</td>
                                <td className="p-2 border">{request.EventName}</td>
                                <td className="p-2 border">{request.Category}</td>
                                <td className="p-2 border">{request.RequestQuantity}</td>
                                <td className="p-2 border">{request.RequestUrgency}</td>
                                <td className="p-2 border">
                                    <div>
                                        <input type="text" className="form-group" onChange={(e) => setDonationAmount(parseInt(e.target.value))} />
                                        <button onClick={() => handleDonation(request, donationAmount)} className="donate-request-btn blue-btn">Donate</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Donation_Requests;
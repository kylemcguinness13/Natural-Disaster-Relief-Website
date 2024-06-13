import React, {useState, useEffect} from 'react';

function RecipientDashboard() {
  const [responses, setResponses] = useState([]);
  const [requestsActive, setRequestsActive] = useState([]);

  useEffect(() => {
    fetchRecipientResponses();
    fetchActiveRequests();
  },[]);

  const fetchRecipientResponses = () => {
    fetch("http://localhost:3000/api/requests/getrecipientresponses/"+localStorage.getItem("id"))
      .then((response) => response.json())
      .then((data) => setResponses(data))
      .catch((error) => console.error(error));
  }

  const fetchActiveRequests = () => {
    fetch("http://localhost:3000/api/requests/getactiverequests/"+localStorage.getItem("id"))
      .then((response) => response.json())
      .then((data) => setRequestsActive(data))
      .catch((error) => console.error(error));
  }

  return (
    <div className='bg-slate-900'>
      <div className="col-md-6" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Active Donation Requests</h2>
        <table className="border w-full">
          <thead>
              <tr>
                  <th className="p-2 border">Disaster Event</th>
                  <th className="p-2 border">Item Donated</th>
                  <th className="p-2 border">Item Quantity</th>
              </tr>
          </thead>
          <tbody>
              {requestsActive.map((request) => (
                  <tr key={request.RequestId}>
                      <td className="p-2 border">{request.EventName}</td>
                      <td className="p-2 border">{request.RequestCategory}</td>
                      <td className="p-2 border">{request.RequestQuantity}</td>
                  </tr>
              ))}
          </tbody>
      </table>
    </div>
      <div className="col-md-6" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Donation Request Responses</h2>
        <table className="border w-full">
          <thead>
              <tr>
                  <th className="p-2 border">Disaster Event</th>
                  <th className="p-2 border">Donor Email</th>
                  <th className="p-2 border">Donor Location</th>
                  <th className="p-2 border">Item Donated</th>
                  <th className="p-2 border">Item Quantity</th>
              </tr>
          </thead>
          <tbody>
              {responses.map((response) => (
                  <tr key={response.ResponseId}>
                      <td className="p-2 border">{response.EventName}</td>
                      <td className="p-2 border">{response.DonorEmail}</td>
                      <td className="p-2 border">{response.ResponderZipCode}</td>
                      <td className="p-2 border">{response.RequestCategory}</td>
                      <td className="p-2 border">{response.ResponseQuantity}</td>
                  </tr>
              ))}
          </tbody>
      </table>
    </div>
    </div>
  );
}

export default RecipientDashboard;

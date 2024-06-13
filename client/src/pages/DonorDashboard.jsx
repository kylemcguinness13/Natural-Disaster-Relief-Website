import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function DonorDashboard() {
  const [pledges, setPledges] = useState([]);
  const [fulfilledRequests, setFulfilledRequests] = useState([]);

  useEffect(() => {
    fetchFulfilledRequests();
    fetchPledges();
    console.log(pledges);
  },[]);

  const fetchPledges = () => {
    fetch("http://localhost:3000/api/users/getpledges/"+localStorage.getItem("id"))
      .then((response) => response.json())
      .then((data) => setPledges(data))
      .catch((error) => console.error(error));
  }

  const fetchFulfilledRequests = () => {
    fetch("http://localhost:3000/api/requests/getfulfilledrequests/"+localStorage.getItem("id"))
      .then((response) => response.json())
      .then((data) => setFulfilledRequests(data))
      .catch((error) => console.error(error));
  }

  return (
    <div className='bg-slate-900' style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Donor Dashboard</h1>
      <p>Your contributions make a difference. Choose how you'd like to help today.</p>
      <div>
        <Link to="/make-pledge" style={{ marginRight: 20 }}>
          <button style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px' }}>Make a Pledge</button>
        </Link>
        <Link to="/fulfill-request">
          <button style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px' }}>Fulfill Request</button>
        </Link>
      </div>
      <div className="row">
    <div className="col-md-6 mx-auto" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Active Pledges</h2>
        <table className="table">
            <thead>
                <tr>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Quantity</th>
                </tr>
            </thead>
            <tbody>
              {pledges.map((pledge) => (
                <tr key={pledge.PledgeId}>
                    <td className="p-2 border">{pledge.Category}</td>
                    <td className="p-2 border">{pledge.Quantity}</td>
                </tr>
              ))}
            </tbody>
        </table>
    </div>
    <div className="col-md-6 mx-auto" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Fulfilled Requests</h2>
        <table className="border w-full">
          <thead>
              <tr>
                  <th className="p-2 border">Disaster Event</th>
                  <th className="p-2 border">Recipient Email</th>
                  <th className="p-2 border">Recipient Location</th>
                  <th className="p-2 border">Item Donated</th>
                  <th className="p-2 border">Item Quantity</th>
              </tr>
          </thead>
          <tbody>
              {fulfilledRequests.map((response) => (
                  <tr key={response.ResponseId}>
                      <td className="p-2 border">{response.EventName}</td>
                      <td className="p-2 border">{response.RequestEmail}</td>
                      <td className="p-2 border">{response.RequestZipCode}</td>
                      <td className="p-2 border">{response.RequestCategory}</td>
                      <td className="p-2 border">{response.ResponseQuantity}</td>
                  </tr>
              ))}
          </tbody>
      </table>
    </div>
</div>
    </div>
  );
}

export default DonorDashboard;

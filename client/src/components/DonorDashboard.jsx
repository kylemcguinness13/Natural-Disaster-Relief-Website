import React, { useState } from 'react';

function MakePledgeSection() {
  const [pledge, setPledge] = useState('');

  const handlePledgeSubmit = (event) => {
    event.preventDefault();
    console.log('Pledge to donate:', pledge);
    // This is where you would send the pledge to your server
  };

  return (
    <section>
      <h2>Make a Pledge</h2>
      <form onSubmit={handlePledgeSubmit}>
        <input
          type="text"
          placeholder="Enter item to pledge"
          value={pledge}
          onChange={(e) => setPledge(e.target.value)}
        />
        <button type="submit">Submit Pledge</button>
      </form>
    </section>
  );
}

function FulfillRequestSection() {
  const [request, setRequest] = useState('');

  const handleFulfillSubmit = (event) => {
    event.preventDefault();
    console.log('Fulfill request with pledge:', request);
    // This is where you would handle the fulfillment on your server
  };

  return (
    <section>
      <h2>Fulfill Request with a Pledge</h2>
      <form onSubmit={handleFulfillSubmit}>
        <input
          type="text"
          placeholder="Enter request to fulfill"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
        />
        <button type="submit">Fulfill Request</button>
      </form>
    </section>
  );
}

function DonorDashboard() {
  return (
    <div>
      <h1>Donor Dashboard</h1>
      <MakePledgeSection />
      <FulfillRequestSection />
    </div>
  );
}

export default DonorDashboard;

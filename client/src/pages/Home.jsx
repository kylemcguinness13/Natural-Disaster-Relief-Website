import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import image5 from '../assets/image5.jpg';

export default function Home() {

  return (
    <div className='bg-cover bg-center' style={{backgroundImage: `url(${image5})`}}>
      <div className='introduction'>
        <h1>Welcome to Disaster Relief Network</h1>
        <p>Join our efforts to provide aid and support to those affected by natural disasters. Every contribution matters.</p>
        <button className='cta-button'>Learn More</button>
      </div>
      <div className='side_by_side'>
        <div className='side_by_side_child' onClick={() => {/* navigate to disaster events page */}}>
          <h2>Disaster Events</h2>
          <p>Explore ongoing disaster events and see where help is needed most.</p>
        </div>
        <div className='side_by_side_child' onClick={() => {/* navigate to donation requests page */}}>
          <h2>Donation Requests</h2>
          <p>Find out what items are in demand and contribute to the cause.</p>
        </div>
      </div>
      <div className='dashboards'>
        <h2>Dashboards</h2>
        <div className='dashboard-box'>
          <h3>Admin Dashboard</h3>
          <p>Manage disaster events, donation requests, and user accounts.</p>
          <Link to="/admin-dashboard" className='dashboard-link'>Access Admin Dashboard</Link>
        </div>
        <div className='dashboard-box'>
          <h3>Donor Dashboard</h3>
          <p>Explore ongoing disaster events and make donations.</p>
          <Link to="/donor-dashboard" className='dashboard-link'>Access Donor Dashboard</Link>
        </div>
        <div className='dashboard-box'>
          <h3>Recipient Dashboard</h3>
          <p>View donation requests and manage received donations.</p>
          <Link to="/recipient-dashboard" className='dashboard-link'>Access Recipient Dashboard</Link>
        </div>
      </div>
      <div className='get-started'>
        <h2>Get Involved Now!</h2>
        <p>Ready to make a difference? Start by making a pledge or fulfilling a request today.</p>
        <button className='cta-button'>Make a Pledge</button>
        <button className='cta-button'>Fulfill a Request</button>
      </div>
      {/* Footer could be added here */}
    </div>
  );
}
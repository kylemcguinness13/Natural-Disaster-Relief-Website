import React, { useState } from "react";
import Navbar from "./components/Navbar";
import AuthForm from "./components/Logon";
import DonorDashboard from "./pages/DonorDashboard";
import AdminDashboard from "./pages/AdminDashboard"; // Make sure to create or adjust this component
import RecipientDashboard from "./pages/RecipientDashboard"; // Make sure to create or adjust this component
import { Routes, Route } from "react-router-dom";
import Disaster_Events from "./pages/Disaster_Events";
import Donation_Requests from "./pages/Donation_Requests";
import Home from "./pages/Home";
import MakePledgeForm from './components/MakePledgeForm';
//import FulfillRequestSection from './components/FulfillRequestSection';

function App() {
  const [serverStatus, setServerStatus] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("");

  const testConnection = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/testConnection");
      const data = await response.json();
      console.log(data.message); // Log the message from the server
      setServerStatus(data.message); // Update state with the server response
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setServerStatus("Backend is not responding"); // Update state to indicate an error
    }
  };

  const checkDatabaseConnection = () => {
    fetch("http://localhost:3000/api/users/test-db")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setConnectionStatus("Database connection is successful.");
        } else {
          setConnectionStatus("Database connection failed.");
        }
      })
      .catch((error) => {
        console.error("Failed to connect to backend or database:", error);
        setConnectionStatus("Failed to connect to backend or database.");
      });
  };

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col text-white">
      <Navbar />
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Disaster_Events" element={<Disaster_Events />} />
          <Route path="/Donation_Requests" element={<Donation_Requests />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/recipient-dashboard" element={<RecipientDashboard />} />
          <Route path="/make-pledge"  element={<MakePledgeForm />} />

          <Route path="/Login" element={<AuthForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

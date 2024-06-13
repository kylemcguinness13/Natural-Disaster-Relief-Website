import React from "react";
import EventForm from "../components/EventForm";

function AdminDashboard() {
  return (
    <div className="bg-slate-900 p-4">
      <h2>Admin Dashboard</h2>
      <div className="text-black">
        <EventForm />
      </div>
    </div>
  );
}

export default AdminDashboard;

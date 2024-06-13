import React, { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    EventName: "",
    StartDate: "",
    EndDate: "",
    EventDescription: "",
    EventStatus: 1,
    EventUrgency: 0,
    ZipCodes: "",
  });

  const [eventId, setEventId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/events/createevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setEventId(data.eventId);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6">Event Registration</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="EventName">
            Event Name
          </label>
          <input
            type="text"
            id="EventName"
            name="EventName"
            className="w-full p-2 border rounded"
            value={formData.EventName}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="StartDate"
            >
              Start Date
            </label>
            <input
              type="date"
              id="StartDate"
              name="StartDate"
              className="w-full p-2 border rounded"
              value={formData.StartDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="EndDate">
              End Date
            </label>
            <input
              type="date"
              id="EndDate"
              name="EndDate"
              className="w-full p-2 border rounded"
              value={formData.EndDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="EventDescription"
          >
            Event Description
          </label>
          <textarea
            id="EventDescription"
            name="EventDescription"
            className="w-full p-2 border rounded"
            rows="4"
            value={formData.EventDescription}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="EventStatus"
          >
            Event Status
          </label>
          <select
            id="EventStatus"
            name="EventStatus"
            className="w-full p-2 border rounded"
            value={formData.EventStatus ? "active" : "inactive"}
            onChange={handleChange}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="EventUrgency"
          >
            Urgency Rating
          </label>
          <input
            type="number"
            id="EventUrgency"
            name="EventUrgency"
            className="w-full p-2 border rounded"
            min="0"
            max="10"
            value={formData.EventUrgency}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="ZipCodes">
            Zip Codes (comma-separated)
          </label>
          <input
            type="text"
            id="ZipCodes"
            name="ZipCodes"
            className="w-full p-2 border rounded"
            value={formData.ZipCodes}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventForm;

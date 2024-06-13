import React, { useEffect, useState } from "react";
import { VscEdit, VscCheck, VscClose } from "react-icons/vsc";

export default function Disaster_Events() {
  const [events, setEvents] = useState([]);
  const [editableRowId, setEditableRowId] = useState(null);
  var editedEvent = {};

  useEffect(() => {
    fetch("http://localhost:3000/api/events/getevents")
      .then((response) => response.json())
      .then((data) => setEvents(data.reverse()))
      .catch((error) => console.error(error));
  }, []);

  function setEventName(value) {
    editedEvent = { ...editedEvent, EventName: value };
  }

  function setStartDate(value) {
    editedEvent = { ...editedEvent, StartDate: value };
  }

  function setEndDate(value) {
    editedEvent = { ...editedEvent, EndDate: value };
  }

  function setDescription(value) {
    editedEvent = { ...editedEvent, EventDescription: value };
  }

  function setStatus(value) {
    editedEvent = { ...editedEvent, EventStatus: value };
  }
  function setUrgency(value) {
    editedEvent = { ...editedEvent, EventUrgency: value };
  }

  function saveEditedEvent() {
    var newEvent = {};
    if (editableRowId) {
      newEvent = events.find((event) => event.EventId === editableRowId);
      newEvent = { ...newEvent, ...editedEvent };
      const updatedEvents = events.map((event) => {
        if (event.EventId === editableRowId) {
          return newEvent;
        }
        return event;
      });
      newEvent.StartDate = newEvent.StartDate.split("T")[0];
      newEvent.EndDate = newEvent.EndDate.split("T")[0];
      console.log(newEvent);
      fetch("http://localhost:3000/api/events/updateevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          console.log(data);
        })
        .catch((error) => console.error(error));
      setEvents(updatedEvents);
      setEditableRowId(null);
      editedEvent = {};
    }
  }

  return (
    <div>
      <h1>Disaster Events</h1>
      <div className="bg-slate-800 text-white">
        <table className="border w-full">
          <thead>
            <tr>
              <th className="p-2 border">Event Name</th>
              <th className="p-2 border">Start Date</th>
              <th className="p-2 border">End Date</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Urgency</th>
              <th className="p-2 border">Location Zip Codes</th>
              <th className="p-2 border">Edit</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(events) && events.map((event) => (
              <tr key={event.EventId}>
                <td className="p-2 border">
                  {editableRowId === event.EventId ? (
                    <input
                      className="w-full p-1 bg-transparent border"
                      type="text"
                      placeholder={event.EventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  ) : (
                    event.EventName
                  )}
                </td>
                <td className="p-2 border">
                  {editableRowId === event.EventId ? (
                    <input
                      className="w-full p-1 bg-transparent border"
                      type="date"
                      placeholder={event.StartDate.split("T")[0]}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  ) : (
                    event.StartDate.split("T")[0]
                  )}
                </td>
                <td className="p-2 border">
                  {editableRowId === event.EventId ? (
                    <input
                      className="w-full p-1 bg-transparent border"
                      type="date"
                      placeholder={event.EndDate.split("T")[0]}
                      onChange={(e) => setEndDate(e.target.value)}
                      onBlur={() => saveChanges(event.EventId)}
                    />
                  ) : (
                    event.EndDate.split("T")[0]
                  )}
                </td>
                <td className="p-2 border">
                  {editableRowId === event.EventId ? (
                    <input
                      className="w-full p-1 bg-transparent border"
                      type="text"
                      placeholder={event.EventDescription}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  ) : (
                    event.EventDescription
                  )}
                </td>
                <td className="p-2 border">
                  {editableRowId === event.EventId ? (
                    <select
                      className="w-full p-1 bg-transparent border"
                      placeholder={event.EventStatus}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  ) : event.EventStatus === 1 ? (
                    "Active"
                  ) : (
                    "Inactive"
                  )}
                </td>
                <td className="p-2 border">
                  {editableRowId === event.EventId ? (
                    <input
                      className="w-full p-1 bg-transparent border"
                      type="number"
                      placeholder={event.EventUrgency}
                      onChange={(e) => setUrgency(parseInt(e.target.value, 10))}
                    />
                  ) : (
                    event.EventUrgency
                  )}
                </td>
                <td className="p-2 border">{event.CombinedZipCodes}</td>
                <td className="border">
                  {editableRowId === event.EventId ? (
                    <div className="w-full flex justify-around p-2">
                      <button
                        className="flex justify-center text-xl"
                        onClick={saveEditedEvent}
                      >
                        <VscCheck />
                      </button>
                      <button
                        className="flex justify-center text-xl"
                        onClick={() => setEditableRowId(null)}
                      >
                        <VscClose />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full flex justify-center"
                      onClick={() => setEditableRowId(event.EventId)}
                    >
                      <VscEdit />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

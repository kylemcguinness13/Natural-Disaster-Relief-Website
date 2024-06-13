import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const syncLocalStorageWithState = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", syncLocalStorageWithState);
  }, []);

  return (
    <nav className="w-full flex items-center bg-gray-950 text-white justify-between p-4">
      <Link to="/" className="title font-bold text-2xl">
        Disaster Releif
      </Link>
      <div className="flex gap-2">
        <NavLink
          className="hover:bg-blue-700 p-2 rounded-lg text-lg"
          to="/Disaster_Events"
        >
          Disaster Events
        </NavLink>
        <NavLink
          className="hover:bg-blue-700 p-2 rounded-lg text-lg"
          to="/Donation_Requests"
        >
          Donation Requests
        </NavLink>
        {token == null ? (
          <NavLink
            className="hover:bg-blue-700 p-2 rounded-lg text-lg"
            to="/Login"
          >
            Login/Signup
          </NavLink>
        ) : (
          <button
            className="hover:bg-blue-700 p-2 rounded-lg text-lg"
            onClick={() => {
              localStorage.removeItem("id");
              localStorage.removeItem("role");
              localStorage.removeItem("name");
              localStorage.removeItem("token");
              setToken(null);
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        )}
        <div className="flex items-center">
          {token == null ? <></> : <NotificationBell />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

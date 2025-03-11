import React from 'react'
import Notification from "./images/Notification.png";
import Back from "./images/Back.png";
import User from "./images/User.png";
import { useNavigate,useLocation } from "react-router-dom";
function Header() {
    const location = useLocation();
    const navigate = useNavigate();
  return (
    <div className="container-fluid bg-white border rounded-1  p-3 d-flex justify-content-between">
    <span className="text-center fs-6">
      <img
        src={Back}
        alt="Back btn"
        className="me-1"
        onClick={() => navigate(-1)}
      />{" "}
     {location.pathname.replace("/", "").replace("-", " ").toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}
    </span>
    <span className="">
      {" "}
      <img className="me-3" src={Notification} alt="Notification" />{" "}
      <img className="me-2" src={User} alt="User" />
    </span>
  </div>
  )
}

export default Header;

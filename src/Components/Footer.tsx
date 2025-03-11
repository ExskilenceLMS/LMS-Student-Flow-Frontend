import React from "react";
import FAQ from "./images/FAQ.png";
import { useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-end "
      style={{ position: "fixed", bottom: "20px", right: "30px" }}
    >
      <img src={FAQ} onClick={() => navigate("/faq")} alt="FAQ" />
    </div>
  );
}

export default Footer;

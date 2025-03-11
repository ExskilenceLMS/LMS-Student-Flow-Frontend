import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import timer from "./Components/images/Timer.png";
import problems from "./Components/images/problems.png";
import wifi from "./Components/images/Wifi.png";
const TestIntroduction: React.FC = () => {
  const location = useLocation();
  // const title = location.state.title;
  const navigate=useNavigate();
  sessionStorage.setItem("time", "600");
  // console.log(title);
  return (
    <div style={{ backgroundColor: "#F2EEEE", minHeight: "100vh" }}>
      <Sidebar />
      <div
        className="p-0 my-0 me-2"
        style={{ backgroundColor: "#F2EEEE", marginLeft: "70px" }}
      >
        <Header />
        <div
          className="container-fluid bg-white mt-2 border rounded-1"
          style={{
            maxWidth: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            backgroundColor: "#f2eeee",
            height: `calc(100vh - 100px)`,
          }}
        >
          <div className="container-fluid">
            <div
              className="row m-3 border rounded-1 py-4"
              style={{
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                backgroundColor: "white",
              }}
            >
              <div className="col d-flex justify-content-center align-items-center">
                <div className="">
                  <img
                    src={timer}
                    alt="Logo"
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
                <div className="ms-2">
                  <p className="m-0 fs-5 fw-bold">10 minutes</p>
                  <p className="m-0">test duration</p>
                </div>
              </div>
              <div className="col d-flex justify-content-center align-items-center">
                <div>
                  <img
                    src={problems}
                    alt="Logo"
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
                <div className="ms-2">
                  <p className="m-0 fs-5 fw-bold">3</p>
                  <p className="m-0">questions to be solved in section 1</p>
                </div>
              </div>
              <div className="col d-flex justify-content-center align-items-center">
                <div>
                  <img
                    src={problems}
                    alt="Logo"
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
                <div className="ms-2">
                  <p className="m-0 fs-5 fw-bold">3</p>
                  <p className="m-0">questions to be solved in section 2</p>
                </div>
              </div>
            </div>
            <div
              className="row m-3 border rounded-1"
              style={{
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                backgroundColor: "white",
              }}
            >
              <span
                className="p-0 m-0 py-2 px-4"
                style={{ backgroundColor: "#FCFCFC" }}
              >
                Instructions
              </span>
              <div className="py-2 ps-4" style={{ position: "relative" }}>
                <div
                  className="text-center"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: "1",
                  }}
                >
                  <img
                    src={wifi}
                    alt="Logo"
                    style={{ width: "50px", height: "50px" }}
                  /><br/>
                  <span>Internet Status</span>
                </div>
                <p>
                  To enjoy the best experience on our platform, please ensure
                  that
                </p>
                <p className="p-0 m-0 fw-bold ps-2">
                  1. The operating system on your computer is one of the 3
                  mentioned below:
                </p>
                <ul className="ps-5">
                  <li>Windows 7 and above</li>
                  <li>Linux distributions or </li>
                  <li>Mac OS X 10.6 and above</li>
                </ul>

                <p className="p-0 m-0 fw-bold ps-2">
                  2. You are opening the assessment in the latest versions of
                  one of the browsers mentioned below:
                </p>
                <ul className="ps-5" style={{ color: "green" }}>
                  <li style={{ color: "black" }}>Chrome/ Chromium</li>
                  <li style={{ color: "black" }}>Mozilla Firefox</li>
                  <li style={{ color: "black" }}>Microsoft Edge</li>
                  <li style={{ color: "black" }}>Apple Safari</li>
                </ul>

                <p className="p-0 m-0 fw-bold ps-2">
                  3. Basic Prototype enabled
                </p>
                <p className="p-0 m-0 fw-bold ps-2">
                  4. Other Question related instructions has to be added
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-end pe-4">
              <button
                className="btn border border-black fw-bold"
                style={{
                  borderRadius: "10px",
                  width: "150px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
                onClick={() => navigate("/test-section")}
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      </div>
            <div style={{cursor: "pointer"}}>
        <Footer />
      </div>
    </div>
  );
}

export default TestIntroduction;

import React from "react";
import Sidebar from "./Components/Sidebar";
import Profile from "./Components/Profile";
import Progress from "./Components/Progress";
import Courses from "./Components/Courses";
import Activity from "./Components/Activity";
import Upcoming from "./Components/Upcoming";
import Calendar from "./Components/Calendar";
import Footer from "./Components/Footer";
const Dashboard : React.FC =() => {
  return (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <Sidebar />
      <div
        className=""
        style={{ marginLeft: "70px", backgroundColor: "#f0f0f0" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div
              className="col me-3 ms-1 my-3 rounded-3 text-white"
              style={{ backgroundColor: "#17202a" }}
            >
              <div className="row py-4 px-3">
                <div className="col-lg-7 col-md-6 col-xl-8 col-xxl-7">
                  <Profile />
                </div>
                <div className="col-lg-5 col-md-6 col-xl-4 col-xxl-5">
                  <Progress />
                </div>
              </div>
            </div>
          </div>
          <div className="row me-2">
            <div className="col bg-white rounded-3 px-4 ">
              <Courses />
            </div>
          </div>

          <div className="row me-2 mt-3 mb-3">
            <div className="col-sm-12 col-md-12 col-lg-5 p-0 ">
              <Activity />
            </div>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0">
              <Upcoming />
            </div>
            <div className="col-sm-12 col-md-4 col-lg-3 p-0">
              <Calendar />
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

export default Dashboard;

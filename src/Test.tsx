import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import report from"./Components/images/test-report.png";
interface Completed {
  title: string;
  subject: string;
  startdate: string;
  starttime: string;
  enddate: string;
  endtime: string;
  score: string;
}
interface Ongoing {
  title: string;
  subject: string;
  startdate: string;
  starttime: string;
  enddate: string;
  endtime: string;
  score: string;
}
interface Upcoming {
  title: string;
  subject: string;
  startdate: string;
  starttime: string;
  enddate: string;
  endtime: string;
  score: string;
}
interface Table {
  Completed: Completed[];
  Ongoing: Ongoing[];
  Upcoming: Upcoming[];
}

const Test: React.FC = () => {
  const navigate = useNavigate()
  const handleTest = (data: Ongoing) => {
    navigate('/test-introduction', { state: { title: data.title } })
  }

  const [status, setStatus] = useState<string>("Ongoing");
  
  const tableData: Table = {
    Completed: [
      {
        title: "Math Exam",
        subject: "Mathematics",
        startdate: "10-01-2025",
        starttime: "09:00",
        enddate: "10-01-2025",
        endtime: "11:00",
        score: "85/100",
      },
      {
        title: "History Quiz",
        subject: "History",
        startdate: "12-01-2025",
        starttime: "14:00",
        enddate: "12-01-2025",
        endtime: "15:00",
        score: "90/100",
      },
      {
        title: "Science Final",
        subject: "Science",
        startdate: "15-01-2025",
        starttime: "08:30",
        enddate: "15-01-2025",
        endtime: "10:30",
        score: "78/100",
      },
      {
        title: "English Essay",
        subject: "English",
        startdate: "17-01-2025",
        starttime: "10:00",
        enddate: "17-01-2025",
        endtime: "12:00",
        score: "92/100",
      },
    ],
    Ongoing: [
      {
        title: "Physics Lab",
        subject: "Physics",
        startdate: "20-01-2025",
        starttime: "10:00",
        enddate: "24-01-2025",
        endtime: "12:00",
        score: "0/100",
      },
      {
        title: "Chemistry Project",
        subject: "Chemistry",
        startdate: "22-01-2025",
        starttime: "15:00",
        enddate: "25-01-2025",
        endtime: "17:00",
        score: "0/100",
      },
      {
        title: "Computer Science Assignment",
        subject: "Computer Science",
        startdate: "23-01-2025",
        starttime: "09:00",
        enddate: "28-01-2025",
        endtime: "11:00",
        score: "0/100",
      },
      {
        title: "Art Project",
        subject: "Art",
        startdate: "24-01-2025",
        starttime: "12:00",
        enddate: "30-01-2025",
        endtime: "14:00",
        score: "0/100",
      },
    ],
    Upcoming: [
      {
        title: "English Essay",
        subject: "English",
        startdate: "28-01-2025",
        starttime: "09:00",
        enddate: "28-01-2025",
        endtime: "11:00",
        score: "0/100",
      },
      {
        title: "Biology Test",
        subject: "Biology",
        startdate: "05-02-2025",
        starttime: "13:00",
        enddate: "05-02-2025",
        endtime: "14:30",
        score: "0/100",
      },
      {
        title: "Literature Presentation",
        subject: "Literature",
        startdate: "10-02-2025",
        starttime: "14:00",
        enddate: "10-02-2025",
        endtime: "16:00",
        score: "0/100",
      },
      {
        title: "Geography Quiz",
        subject: "Geography",
        startdate: "15-02-2025",
        starttime: "11:00",
        enddate: "15-02-2025",
        endtime: "12:00",
        score: "0/100",
      },
    ],
  };
  
  const getData = () => {
    if (status === "Completed") return tableData.Completed;
    if (status === "Ongoing") return tableData.Ongoing;
    return tableData.Upcoming;
  };
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
          <div className="row">
            <div className="col-md-3 col-lg-2">
              <div className="row p-2">
                <div className="col border rounded-1 mt-2 pt-2">
                  <h5 className="text-center">Filter</h5>
                  <label className="form-label m-0 p-0 pt-2 ps-1">Search</label>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                  />
                  <label className="form-label m-0 p-0 pt-2 ps-1">
                    Test Type
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="weekly">Weekly Test</option>
                    <option value="practice">Practice Test</option>
                    <option value="final">Final Test</option>
                  </select>
                  <label className="form-label m-0 p-0 pt-2 ps-1">
                    Subject
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="sql">SQL</option>
                    <option value="python">Python</option>
                  </select>
                  <label className="form-label m-0 p-0 pt-2 ps-1">
                    Test Status
                  </label>
                  <select
                    className="form-select"
                    onChange={(event) => setStatus(event.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <label className="form-label m-0 p-0 pt-2 ps-1">Topic</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  ></select>
                  <label className="form-label m-0 p-0 pt-2 ps-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Start Date"
                  />
                  <label className="form-label m-0 p-0 pt-2 ps-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="End Date"
                  />
                  <div className="d-flex justify-content-center my-4">
                    <button className="btn border-black btn-sm" style={{backgroundColor:"#E4F0FF",width:"90px"}}>Apply</button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-md-9 col-lg-10">
              <div className="row">
                <div className="col">
                  {getData() ? (
                    <div className="table-container py-3">
                    <div
                      className="table-header d-flex justify-content-between align-items-center p-0 pb-3 border border-secondary rounded-1 fs-5 fw-normal"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="col text-center">S.no</div>
                      <div className="col text-center">Test name</div>
                      <div className="col text-center">Subject</div>
                      <div className="col text-center">Start Date</div>
                      <div className="col text-center">End Date</div>
                      <div className="col text-center">Score</div>
                      <div className="col text-center">{status==="Completed"?"View Report":"Action"}</div>
                    </div>
                    <div className="table-body">
                      {getData().map((data, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center border border-secondary rounded-1 p-2 flex-wrap"
                        >
                          <div className="col text-center">{index + 1}</div>
                          <div className="col text-center">{data.title}</div>
                          <div className="col text-center">{data.subject}</div>
                          <div className="col text-center">
                            {data.startdate} <br /> {data.starttime}
                          </div>
                          <div className="col text-center">
                            {data.enddate} <br /> {data.endtime}
                          </div>
                          <div className="col text-center">{data.score}</div>
                          <div className="col text-center">
                            {status === "Upcoming"
                              ? <button className="btn border-black btn-sm" style={{width:"80px",backgroundColor:"#F1F1F1"}}>Start</button>
                              : status === "Ongoing"
                              ? <button className="btn border-black btn-sm" onClick={() =>handleTest(data)} style={{width:"80px",backgroundColor:"#E5EBFF"}}>Start</button>
                              :<img src={report} alt="Report" onClick={() => navigate('/test-report', { state: { title: data.title } })} style={{width: '30px', height: '30px'}} />
}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  ) : (
                    <p>Loading Test data...</p>
                  )}
                </div>
              </div>
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

export default Test;

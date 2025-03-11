import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import { useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
interface Sessions {
  id: string;
  name: string;
  date: string;
  time: string;
  meet_link: string;
  attendance: string;
  video_link: string;
  ended: boolean;
  status:string;
}

const sampleSessions: Sessions[] = [
  {
    id: "1",
    name: "React Basics",
    date: "19-01-25",
    time: "10:00",
    meet_link: "https://meet.google.com/xyz-abc123",
    attendance: "90%",
    video_link: "",
    ended: false,
    status:"Completed"
  },
  {
    id: "2",
    name: "Advanced JavaScript",
    date: "20-01-25",
    time: "14:00",
    meet_link: "https://meet.google.com/abc-def456",
    attendance: "75%",
    video_link: "https://video.com/advanced-js",
    ended: false,
    status:"Ongoing"    
  },
  {
    id: "3",
    name: "Node.js Introduction",
    date: "22-01-25",
    time: "11:00",
    meet_link: "https://meet.google.com/ghi-jkl789",
    attendance: "100%",
    video_link: "",
    ended: true,
    status:"Upcoming"
    },
  {
    id: "4",
    name: "TypeScript Crash Course",
    date: "30-01-25",
    time: "09:00",
    meet_link: "https://meet.google.com/mno-pqr123",
    attendance: "",
    video_link: "https://video.com/ts-crash-course",
    ended: false,
    status:"Upcoming"
    },
];

const OnlineSession: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Sessions[]>(sampleSessions);

  return (
    <>
      <div style={{ backgroundColor: "#F2EEEE", minHeight: "100vh" }}>
        <Sidebar />
        <div
          className="p-0 my-0 me-2"
          style={{ backgroundColor: "#F2EEEE", marginLeft: "70px" }}
        >
          <Header/>
          <div
            className="container-fluid bg-white mt-2 border rounded-1"
            style={{
              height: `calc(100vh - 110px)`,
              overflowY: "auto",
              backgroundColor: "white",
            }}
          >
            <div className="">
              {sessions.length > 0 ? (
                <div className="table-container py-3">
                <div className="table-header d-flex p-0 pb-3 border-bottom border-black fs-5 fw-normal">
                  <div className="col">Sl No</div>
                  <div className="col">Session Name</div>
                  <div className="col">Date</div>
                  <div className="col">Time</div>
                  <div className="col">Link</div>
                  <div className="col">Time Attended</div>
                  <div className="col">Video</div>
                  <div className="col">Status</div>
                </div>
                <div className="table-body">
                  {sessions.map((session) => (
                    <div key={session.id} className="table-row d-flex p-2">
                      <div className="col">{session.id}</div>
                      <div className="col">{session.name}</div>
                      <div className="col">{session.date}</div>
                      <div className="col">{session.time}</div>
                      <div className="col">
                        {session.ended ? (
                          "Expired"
                        ) : (
                          <a href={session.meet_link} target="_blank" rel="noopener noreferrer">
                            Join
                          </a>
                        )}
                      </div>
                      <div className="col">
                        {session.attendance ? session.attendance : "--"}
                      </div>
                      <div className="col">
                        {session.video_link ? (
                          <a href={session.video_link} target="_blank" rel="noopener noreferrer">
                            Watch
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </div>
                      <div className="col">
                        {session.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              ) : (
                <p>Loading Sessions data...</p>
              )}
            </div>
          </div>
        </div>
              <div style={{cursor: "pointer"}}>
        <Footer />
      </div>
      </div>
    </>
  );
};

export default OnlineSession;

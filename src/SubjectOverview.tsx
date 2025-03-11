import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Notification from "./Components/images/Notification.png";
import User from "./Components/images/User.png";
import Back from "./Components/images/Back.png";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
const secretKey: string = 'gvhbfijsadfkefjnujrbghj';

interface Day {
  day: number;
  date: string;
  topics?: string[];
  practiceMCQ?: { questions?: string | null; score: string };
  practiceCoding?: { questions?: string | null; score: string };
  testScore?: { score: string };
  Questions?: string;
  Coding?: { questions?: string; score: string };
  status: string;
  title?: string;
  time?: string;
}

interface Week {
  weekNumber: number;
  startDate: string;
  endDate: string;
  totalHours?: string;
  title?: string;
  Score?: string;
  days?: Day[];
  onsiteWorkshop?: boolean;
}

const Roadmap: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title } = location.state || { title: "No title provided" };
  const encryptedTitle = CryptoJS.AES.encrypt(title, secretKey).toString();
  sessionStorage.setItem("subject", encryptedTitle);
  const [data] = useState<Week[]>([
    {
      weekNumber: 1,
      startDate: "19th Dec 24",
      endDate: "25th Dec 24",
      totalHours: "14hrs",
      days: [
        {
          day: 1,
          date: "19th Dec 24",
          topics: ["Introduction", "Types and Query", "Select Query"],
          practiceMCQ: { questions: "5/10", score: "3/10" },
          practiceCoding: { questions: "5/10", score: "3/10" },
          status: "Completed",
        },
        {
          day: 2,
          date: "20th Dec 24",
          topics: ["Introduction to topic1", "Topic1", "Update Query"],
          practiceMCQ: { questions: "5/10", score: "4/10" },
          practiceCoding: { questions: "6/10", score: "4/10" },
          status: "Completed",
        },
        {
          day: 3,
          date: "21st Dec 24",
          topics: ["Advanced Queries", "Subqueries", "Group By"],
          practiceMCQ: { questions: "5/10", score: "3/10" },
          practiceCoding: { questions: "5/10", score: "3/10" },
          status: "Completed",
        },
        {
          day: 4,
          date: "22nd Dec 24",
          topics: ["Join ", "Indexing", "Normalization"],
          practiceMCQ: { questions: "5/10", score: "4/10" },
          practiceCoding: { questions: "5/10", score: "4/10" },
          status: "Resume",
        },
        {
          day: 5,
          date: "24th Dec 24",
          topics: ["Inner Join", "outer join", "cross join"],
          practiceMCQ: { questions: "5/10", score: "4/10" },
          practiceCoding: { questions: "5/10", score: "3/10" },
          status: "Start",
        },
        {
          day: 6,
          date: "23rd Dec 24",
          practiceMCQ: { questions: "5/10", score: "3/10" },
          practiceCoding: { questions: "5/10", score: "3/10" },
          status: "",
          title: "Study day",
        },
        {
          day: 7,
          date: "25th Dec 24",
          title: "Weekly Test",
          testScore: { score: "90/100" },
          status: "",
        },
      ],
    },
    {
      weekNumber: 2,
      startDate: "26th Dec 24",
      endDate: "1st Jan 25",
      totalHours: "14hrs",
      days: [
        {
          day: 1,
          date: "26th Dec 24",
          topics: ["Advanced Queries", "Subqueries", "Group By"],
          practiceMCQ: { questions: "6/10", score: "4/10" },
          practiceCoding: { questions: "6/10", score: "4/10" },
          status: "",
        },
        {
          day: 2,
          date: "27th Dec 24",
          topics: ["Advanced Queries", "Subqueries", "Group By"],
          practiceMCQ: { questions: "6/10", score: "5/10" },
          practiceCoding: { questions: "6/10", score: "5/10" },
          status: "",
        },
        {
          day: 3,
          date: "28th Dec 24",
          topics: ["Join ", "Indexing", "Normalization"],
          practiceMCQ: { questions: "6/10", score: "5/10" },
          practiceCoding: { questions: "6/10", score: "4/10" },
          status: "",
        },
        {
          day: 4,
          date: "29th Dec 24",
          topics: ["Inner Join", "outer join", "cross join"],
          practiceMCQ: { questions: "6/10", score: "5/10" },
          practiceCoding: { questions: "6/10", score: "4/10" },
          status: "",
        },
        {
          day: 5,
          date: "30th Dec 24",
          topics: ["Advanced Queries", "Subqueries", "Full join"],
          practiceMCQ: { questions: "6/10", score: "4/10" },
          practiceCoding: { questions: "6/10", score: "5/10" },
          status: "",
        },
        {
          day: 6,
          date: "31st Dec 24",
          topics: ["Join Operations", "Indexing", "Normalization"],
          practiceMCQ: { questions: "6/10", score: "5/10" },
          practiceCoding: { questions: "6/10", score: "5/10" },
          status: "",
        },
        {
          day: 7,
          date: "1st Jan 25",
          testScore: { score: "85/100" },
          status: "",
        },
      ],
    },
    {
      weekNumber: 3,
      startDate: "2nd Jan 25",
      endDate: "8th Jan 25",
      totalHours: "14hrs",
      days: [
        {
          day: 1,
          date: "2nd Jan 25",
          topics: ["Triggers", "Stored Procedures", "Functions"],
          practiceMCQ: { questions: "7/10", score: "6/10" },
          practiceCoding: { questions: "7/10", score: "6/10" },
          status: "",
        },
        {
          day: 2,
          date: "3rd Jan 25",
          topics: ["Triggers", "Stored Procedures", "Functions"],
          practiceMCQ: { questions: "7/10", score: "6/10" },
          practiceCoding: { questions: "7/10", score: "6/10" },
          status: "",
        },
        {
          day: 3,
          date: "4th Jan 25",
          topics: ["Triggers", "Stored Procedures", "Functions"],
          practiceMCQ: { questions: "7/10", score: "6/10" },
          practiceCoding: { questions: "7/10", score: "5/10" },
          status: "",
        },
        {
          day: 4,
          date: "5th Jan 25",
          topics: ["Data Integrity", "Constraints", "Foreign Keys"],
          practiceMCQ: { questions: "7/10", score: "6/10" },
          practiceCoding: { questions: "7/10", score: "6/10" },
          status: "",
        },
        {
          day: 5,
          date: "6th Jan 25",
          topics: ["Data Integrity", "Constraints", "Foreign Keys"],
          practiceMCQ: { questions: "7/10", score: "6/10" },
          practiceCoding: { questions: "7/10", score: "5/10" },
          status: "",
        },
        {
          day: 6,
          date: "7th Jan 25",
          topics: ["Triggers", "Stored Procedures", "Functions"],
          practiceMCQ: { questions: "7/10", score: "7/10" },
          practiceCoding: { questions: "7/10", score: "6/10" },
          status: "",
        },
        {
          day: 7,
          date: "8th Jan 25",
          testScore: { score: "88/100" },
          status: "",
        },
      ],
    },
    {
      weekNumber: 4,
      startDate: "9th Jan 25",
      endDate: "15th Jan 25",
      totalHours: "14hrs",
      days: [
        {
          day: 1,
          date: "9th Jan 25",
          topics: ["Database Design", "Normalization", "ER Models"],
          practiceMCQ: { questions: "8/10", score: "7/10" },
          practiceCoding: { questions: "8/10", score: "7/10" },
          status: "",
        },
        {
          day: 2,
          date: "10th Jan 25",
          topics: ["Database Design", "Normalization", "ER Models"],
          practiceMCQ: { questions: "8/10", score: "7/10" },
          practiceCoding: { questions: "8/10", score: "7/10" },
          status: "",
        },
        {
          day: 3,
          date: "11th Jan 25",
          topics: ["Database Design", "Normalization", "ER Models"],
          practiceMCQ: { questions: "8/10", score: "7/10" },
          practiceCoding: { questions: "8/10", score: "7/10" },
          status: "",
        },
        {
          day: 4,
          date: "12th Jan 25",
          topics: ["Advanced SQL", "Optimization", "Indexing"],
          practiceMCQ: { questions: "8/10", score: "7/10" },
          practiceCoding: { questions: "8/10", score: "7/10" },
          status: "",
        },
        {
          day: 5,
          date: "13th Jan 25",
          topics: ["Advanced SQL", "Optimization", "Indexing"],
          practiceMCQ: { questions: "8/10", score: "7/10" },
          practiceCoding: { questions: "8/10", score: "7/10" },
          status: "",
        },
        {
          day: 6,
          date: "14th Jan 25",
          topics: ["Advanced SQL", "Optimization", "Indexing"],
          practiceMCQ: { questions: "8/10", score: "7/10" },
          practiceCoding: { questions: "8/10", score: "7/10" },
          status: "",
        },
        {
          day: 7,
          date: "15th Jan 25",
          testScore: { score: "92/100" },
          status: "",
        },
      ],
    },
    {
      weekNumber: 5,
      startDate: "8th Jan 24",
      endDate: "12th Jan 24",
      title: "Workshop",
    },
    {
      weekNumber: 6,
      startDate: "8th Jan 24",
      endDate: "12th Jan 24",
      title: "Final Test",
      Score: "150/200",
      days: [
        {
          day: 1,
          date: "8th Jan 24",
          Questions: "25",
          Coding: { questions: "5/25", score: "5/10" },
          status: "",
        },
        {
          day: 2,
          date: "9th Jan 24",
          Questions: "5",
          Coding: { questions: "5/5", score: "8/10" },
          status: "",
        },
        {
          day: 3,
          date: "10th Jan 24",
          Questions: "10",
          Coding: { questions: "5/10", score: "5/10" },
          status: "",
        },
      ],
    },
    {
      weekNumber: 7,
      startDate: "8th Jan 24",
      endDate: "12th Jan 24",
      title: "Internship",
      Score: "150/200",
      days: [
        {
          day: 1,
          date: "8th Jan 24",
          Questions: "25",
          Coding: { questions: "5/25", score: "5/10" },
          status: "",
        },
        {
          day: 2,
          date: "9th Jan 24",
          Questions: "5",
          Coding: { questions: "5/5", score: "8/10" },
          status: "",
        },
        {
          day: 3,
          date: "10th Jan 24",
          Questions: "10",
          Coding: { questions: "5/10", score: "5/10" },
          status: "",
        },
      ],
    },
  ]);

  const [openWeeks, setOpenWeeks] = useState<Set<number>>(new Set());

  useEffect(() => {
    const weekWithResume = data.find((week) =>
      week.days?.some((day) => day.status === "Resume")
    );

    if (weekWithResume) {
      setOpenWeeks(new Set([weekWithResume.weekNumber]));
    }
  }, [data]);

  const toggleWeek = (weekNumber: number) => {
    const newOpenWeeks = new Set(openWeeks);
    if (newOpenWeeks.has(weekNumber)) {
      newOpenWeeks.delete(weekNumber);
    } else {
      newOpenWeeks.add(weekNumber);
    }
    setOpenWeeks(newOpenWeeks);
  };

  const handleStartButtonClick = () => {
    navigate("/subject-roadmap");
  };

  return (
    <div style={{ backgroundColor: "#F2EEEE", minHeight: "100vh" }}>
      <Sidebar />
      <div
        className="p-0 my-0 me-2"
        style={{ backgroundColor: "#F2EEEE", marginLeft: "70px" }}
      >
        <div className="container-fluid bg-white border rounded-1 p-3 d-flex justify-content-between">
          <span className="text-center fs-6 d-flex align-items-center">
            <img
              src={Back}
              onClick={() => navigate(-1)}
              alt="Back btn"
              className="me-1"
              style={{ cursor: "pointer" }}
            />
            {title}
          </span>
          <span className="">
            <img className="me-3" src={Notification} alt="Notification" />
            <img className="me-2" src={User} alt="User" />
          </span>
        </div>
        <div className="container-fluid bg-white mt-3 border rounded-1 pt-5">
          {data.map((week) => (
            <div className="mb-4 border rounded p-3" key={week.weekNumber}>
              <div
                className="p-2 rounded-2 d-flex justify-content-between"
                style={{ backgroundColor: "#D7DCFF" }}
              >
                <div className="d-flex p-0 justify-content-between flex-wrap">
                  {week.title ? (
                    <h5 className="m-0 p-0 pe-5">{week.title}</h5>
                  ) : (
                    <h5 className="m-0 p-0 pe-3">Week {week.weekNumber}</h5>
                  )}
                  {openWeeks.has(week.weekNumber) && !week.title && (
                    <>
                      {week.days && (
                        <p
                          className="m-0 p-0 text-sm" role="button"
                          title={`You are going to learn ${[
                            ...new Set(
                              week.days
                                .filter((day) => day.topics)
                                .flatMap((day) => day.topics)
                            ),
                          ].reduce((str, topic, index, arr) => {
                            if (index === 0) return topic;
                            if (index === arr.length - 1)
                              return `${str} and ${topic}`;
                            return `${str}, ${topic}`;
                          }, "")}.`}
                        >
                          {(() => {
                            const topics = [
                              ...new Set(
                                week.days
                                  .filter((day) => day.topics)
                                  .flatMap((day) => day.topics)
                              ),
                            ].reduce((str, topic, index, arr) => {
                              if (index === 0) return topic;
                              if (index === arr.length - 1)
                                return `${str} and ${topic}`;
                              return `${str}, ${topic}`;
                            }, "");

                            const text = `You are going to learn ${topics}.`;
                            return text.length >
                              (window.innerWidth < 600
                                ? 50
                                : window.innerWidth < 1024
                                ? 80
                                : 100)
                              ? text.slice(
                                  0,
                                  window.innerWidth <1000
                                    ? 50
                                    : window.innerWidth < 1200
                                    ? 80
                                    : window.innerWidth <1400 ?100:140
                                ) + "..."
                              : text;
                          })()}
                        </p>
                      )}
                    </>
                  )}
                  {week.title && (
                    <>
                      <h5 className="m-0 p-0 pe-5">{week.startDate}</h5>
                      <h5 className="m-0 p-0">{week.endDate}</h5>
                    </>
                  )}
                </div>

                <div className="d-flex justify-content-between">
                  {openWeeks.has(week.weekNumber) && (
                    <>
                      {week.totalHours && (
                        <>
                        <h5 className="m-0 p-0 pe-2">{week.totalHours}<span role="button" title={`${week.totalHours} learning content has assigned for week ${week.weekNumber} and minimum 2 hr per day  `} style={{fontSize:"7px"}} className="ms-1 mb-2 border border-black px-1 rounded-circle">i</span></h5>

                        </>
)}
                    </>
                  )}
                  <h5 className="m-0 p-0 pe-5">
                    {week.Score ? `Score: ${week.Score}` : ""}
                  </h5>

                  <button
                    className="btn btn-sm p-0 px-1 fw-bold border-black border-1"
                    onClick={() => toggleWeek(week.weekNumber)}
                  >
                    {openWeeks.has(week.weekNumber) ? "^" : "v"}
                  </button>
                </div>
              </div>

              {openWeeks.has(week.weekNumber) && week.days ? (
                <div className="mt-3">
                  {/* {!week.title && <div className="row">
                    <div className="col-lg-8 col-xl-7"></div>
                    <div className="col-lg-4 col-xl-5">
                      <span className="px-5 me">Practice MCQ</span>
                      <span className="ps-3 lg-ps-5">Practice Coding </span>
                      <span></span>
                    </div>
                  </div>} */}
                  {week.days.map((day) => (
                    <div
                      className="mb-2 d-flex justify-content-between align-items-center"
                      key={day.day}
                    >
                      <div className="border-end border-1 border-black me-3 p-2">
                        Day {day.day}
                      </div>
                      <div className="d-flex justify-content-between flex-grow-1 border border-2 rounded-2 p-2">
                        {day.date && <div>{day.date}</div>}
                        {day.Questions && <div> {day.Questions} Questions</div>}
                        {day.topics && (
                          <div
                            className="text-start"
                            role="button"
                            title={
                              day.topics
                                ? day.topics
                                    .map((topic) => `${topic}`)
                                    .join(" | ")
                                : ""
                            }
                            style={{
                              width:
                                window.innerWidth >= 1280
                                  ? "500px"
                                  : window.innerWidth >= 1024
                                  ? "300px"
                                  : window.innerWidth >= 768
                                  ? "200px"
                                  : "120px",
                            }}
                          >
                            {day.topics
                              ? day.topics
                                  .map((topic) => `${topic}`)
                                  .join(" | ")
                              : ""}
                          </div>
                        )}
                        {day.title && (
                          <div
                            className="text-start"
                            style={{
                              width:
                                window.innerWidth >= 1280
                                  ? "500px"
                                  : window.innerWidth >= 1024
                                  ? "300px"
                                  : window.innerWidth >= 768
                                  ? "200px"
                                  : "120px",
                            }}
                          >
                            {day.title}
                          </div>
                        )}
                        {day.Coding && (
                          <div>
                            {day.Coding.questions && (
                              <p className="m-0 d-flex justify-content-end">
                                Coding Questions: {day.Coding.questions}
                              </p>
                            )}
                            {day.Coding.score && (
                              <p className="m-0 d-flex justify-content-end">
                                Score: {day.Coding.score}
                              </p>
                            )}
                          </div>
                        )}
                        {(day.practiceMCQ || day.practiceCoding) && (
                          <>
                            <div>
                              {day.practiceMCQ && (
                                <>
                                  {day.practiceMCQ.questions && (
                                    <p className="m-0 d-flex justify-content-end">
                                      Questions: {day.practiceMCQ.questions}
                                    </p>
                                  )}
                                  {day.practiceMCQ.score && (
                                    <p className="m-0 d-flex justify-content-end">
                                      Score: {day.practiceMCQ.score}
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                            <div>
                              {day.practiceCoding && (
                                <>
                                  {day.practiceCoding.questions && (
                                    <p className="m-0 d-flex justify-content-end">
                                      Questions: {day.practiceCoding.questions}
                                    </p>
                                  )}
                                  {day.practiceCoding.score && (
                                    <p className="m-0 d-flex justify-content-end">
                                      Score: {day.practiceCoding.score}
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                          </>
                        )}

                        {day.testScore && day.testScore.score && (
                          <div>Score : {day.testScore.score}</div>
                        )}

                        {day.time && <div>{day.time}</div>}

                        {day.status && (
                          <div>
                            <button
                              style={{
                                width: "85px",
                                backgroundColor: "#E9EBFF",
                                boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.3)",
                              }}
                              className="btn btn-sm"
                              onClick={
                                day.status === "Start"
                                  ? handleStartButtonClick
                                  : undefined
                              }
                            >
                              {day.status}
                            </button>
                          </div>
                        )}

                        {!day.status && <div style={{ width: "85px" }}></div>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div style={{cursor: "pointer"}}>
        <Footer />
      </div>
    </div>
  );
};

export default Roadmap;

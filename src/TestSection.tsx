import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import Notification from "./Components/images/Notification.png";
import Back from "./Components/images/Back.png";
import User from "./Components/images/User.png";

interface Data {
  id: string;
  question: string;
  questionId: string;
  level: number;
  score: number;
  status: string;
}

interface QuestionList {
  mcq: Data[];
  coding: Data[];
}

const questionList: QuestionList = {
  mcq: [
    {
      id: "1",
      question:
        "Retrieve all the questions from the lecturers table where the level is 1 and data is submitted.",
      questionId: "qsq250124emw001",
      level: 1,
      score: 10,
      status: "Attempted",
    },
    {
      id: "2",
      question: "What is the capital of France?",
      questionId: "qsq250124emw002",
      level: 1,
      score: 10,
      status: "Submitted",
    },
    {
      id: "3",
      question:
        "Retrieve all information about the Students Marks who have scored at least 20.",
      questionId: "qsq250124emw003",
      level: 1,
      score: 10,
      status: "Submitted",
    },
  ],
  coding: [
    {
      id: "1",
      question: "Write a function to find the factorial of a number.",
      questionId: "qsq250124emw004",
      level: 1,
      score: 10,
      status: "Pending",
    },
    {
      id: "2",
      question: "Write a function to reverse a string.",
      questionId: "qsq250124emw005",
      level: 1,
      score: 10,
      status: "Pending",
    },
    {
      id: "3",
      question:
        "Retrieve all information about the Students Marks who have scored at least 20.",
      questionId: "qsq250124emw006",
      level: 1,
      score: 10,
      status: "Pending",
    },
  ],
};

const TestSection: React.FC = () => {
const navigate = useNavigate();
const initialTimeInSeconds = Number(sessionStorage.getItem("time")) || 0;
const [timeInSeconds, setTimeInSeconds] = useState<number>(initialTimeInSeconds);
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let timeString = '';
  if (hours > 0) {
    timeString += `${hours} hr `;
  }
  if (minutes > 0) {
    timeString += `${minutes} min `;
  }
  timeString += `${remainingSeconds} sec`;

  return timeString;
};

useEffect(() => {
  if (timeInSeconds > 0) {
    const intervalId = setInterval(() => {
      setTimeInSeconds((prevTime) => {
        const newTime = prevTime - 1;
        sessionStorage.setItem("time", newTime.toString()); 
        if (newTime <= 0) {
          clearInterval(intervalId);
          console.log("Time done ")
          sessionStorage.setItem("time", "0"); 
          return 0;
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }
}, [timeInSeconds]); 

console.log(formatTime(timeInSeconds));


  return (
    <div style={{ backgroundColor: "#F2EEEE", minHeight: "100vh" }}>
      <Sidebar />
      <div
        className="p-0 my-0 me-2"
        style={{ backgroundColor: "#F2EEEE", marginLeft: "70px" }}
      >
        <div className="container-fluid bg-white border rounded-1 p-3 d-flex justify-content-between align-items-center">
          <span className="text-center fs-6">
            <img
              src={Back}
              alt="Back btn"
              className="me-1"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Test
          </span>
          <div className="d-flex align-items-center">
            <span className="text-danger pe-3 fs-4">
              Time Left: {formatTime(timeInSeconds)}
            </span>
            <img
              className="me-3"
              src={Notification}
              alt="Notification"
              style={{ cursor: "pointer" }}
            />
            <img
              className="me-2"
              src={User}
              alt="User"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="container-fluid bg-white mt-2 border rounded-1 p-3" style={{minHeight: "calc(100vh - 100px)"}}>
        <div className="">
          <span className="fs-5">Section 1: MCQ</span> 
            <span className="float-end">Completed : 1/3</span>
            </div>
          <div>
          {questionList.mcq.map((question, index) => (
            <div
              className="d-flex justify-content-between align-items-center py-2"
              key={question.id}
            >
              <span className=" px-1 border-black border-end">{index + 1}</span>
              <div
                className="w-100 px-2 rounded-1 py-2 d-flex justify-content-between ms-2"
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <span className="text-truncate" style={{ maxWidth: "55%" }}>
                  {question.question}
                </span>
                <div className="text-end d-flex">
                  <span className="me-3">MCQ</span>
                  <span className="me-3">Level {question.level}</span>
                  <span className="me-3">Score {question.score}</span>
                  <button
                    className={`btn btn-sm px-3 border border border-black ${
                      question.status === "Pending"
                        ? "text-dark"
                        : question.status === "Attempted"
                        ? "text-dark"
                        : "text-dark"
                    }`}
                    style={{
                        width:"110px",
                      backgroundColor:
                        question.status === "Pending"
                          ? "#F8F8F8"
                          : question.status === "Attempted"
                          ? "#FEFFBE"
                          : "#CFF7C9",
                    }}
                    onClick={() => {navigate("/mcq-temp")}}
                  >
                    {question.status}
                  </button>
                </div>
              </div>
            </div>
          ))}
            <hr/>
          <h5 className="fw-normal">Section 2: Coding</h5>
          {questionList.coding.map((question, index) => (
            <div
            className="d-flex justify-content-between align-items-center py-2"
            key={question.id}
          >
            <span className=" px-1 border-black border-end">{index + 1}</span>
            <div
              className="w-100 px-2 rounded-1 py-2 d-flex justify-content-between ms-2"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <span className="text-truncate" style={{ maxWidth: "55%" }}>
                {question.question}
              </span>
              <div className="text-end d-flex">
                <span className="me-3">Coding</span>
                <span className="me-3">Level {question.level}</span>
                <span className="me-3">Score {question.score}</span>
                <button
                  className={`btn btn-sm px-3 border border border-black ${
                    question.status === "Pending"
                      ? "text-dark"
                      : question.status === "Attempted"
                      ? "text-dark"
                      : "text-dark"
                  }`}
                  style={{
                    width:"110px",
                    backgroundColor:
                      question.status === "Pending"
                        ? "#F8F8F8"
                        : question.status === "Attempted"
                        ? "#FEFFBE"
                        : "#CFF7C9",
                  }}
                  onClick={() => {navigate("/py-editor")}}
                >
                  {question.status}
                </button>
              </div>
            </div>
          </div>
          ))}
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-sm px-2 py-1 border border-black">Submit the Test</button>
          </div>
        </div>
      </div>
            <div style={{cursor: "pointer"}}>
        <Footer />
      </div>
    </div>
    </div>
  );
};

export default TestSection;

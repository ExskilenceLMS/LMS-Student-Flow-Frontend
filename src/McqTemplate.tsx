import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Notification from "./Components/images/Notification.png";
import User from "./Components/images/User.png";
import backIcon from "./Components/icons/Back Arrow.png";
import { useNavigate } from "react-router-dom";
 
interface Question {
  id: number;
  question: string;
  options: string[];
}
 
const questions: Question[] = [
  {
    id: 1,
    question: "What is SQL?",
    options: ["Structured Query Language", "Standard Query Language", "Structured Question Language", "Standard Question Language"]
  },
  {
    id: 2,
    question: "Which of the following is a relational database management system (RDBMS)?",
    options: ["MongoDB", "MySQL", "Cassandra", "Redis"]
  },
  {
    id: 3,
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Standard Query Language", "Structured Question Language", "Standard Question Language"]
  },
  {
    id: 4,
    question: "Which SQL statement is used to extract data from a database?",
    options: ["EXTRACT", "GET", "SELECT", "FETCH"]
  },
  {
    id: 5,
    question: "Which SQL statement is used to update data in a database?",
    options: ["MODIFY", "UPDATE", "CHANGE", "REVISE"]
  }
];
 
const McqTemplate: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [skippedQuestions, setSkippedQuestions] = useState<boolean[]>(Array(questions.length).fill(false));
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState<boolean>(false);
  const [showSkipConfirmation, setShowSkipConfirmation] = useState<boolean>(false);
 
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
 
  const handleNext = () => {
    if (selectedOption) {
      setShowSkipConfirmation(true);
    } else {
      setShowSkipConfirmation(true);
    }
  };
 
  const handleSubmit = () => {
    if (selectedOption) {
      setShowSubmitConfirmation(true);
    }
  };
 
  const handleConfirmation = (confirm: boolean) => {
    setShowSubmitConfirmation(false);
    setShowSkipConfirmation(false);
    if (confirm) {
      if (selectedOption) {
        const newAnsweredQuestions = [...answeredQuestions];
        newAnsweredQuestions[currentQuestion] = selectedOption;
        setAnsweredQuestions(newAnsweredQuestions);
      } else {
        const newSkippedQuestions = [...skippedQuestions];
        newSkippedQuestions[currentQuestion] = true;
        setSkippedQuestions(newSkippedQuestions);
      }
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      }
    } else {
      // If the user selects "No", do not mark the question as answered or skipped
      setSelectedOption(null);
    }
  };
 
  return (
    <div className="container-fluid p-0" style={{ height: "100vh", maxWidth: "100%", overflowX: "hidden", overflowY: "auto", backgroundColor: "#f2eeee" }}>
      <Sidebar />
      <div className="p-0 my-0 me-2" style={{ backgroundColor: "#F2EEEE", marginLeft: "70px" }}>
        <div className="container-fluid bg-white border rounded-1 p-3 d-flex justify-content-between">
          <span className="text-center fs-6">
            <img src={backIcon} alt="Back btn" onClick={() => { navigate(-1) }} className="me-1" /> SQL &gt; Section1
          </span>
          <span className="">
            <img src={Notification} alt="Notification" className="me-3" />
            <img className="me-2" src={User} alt="User" />
          </span>
        </div>
        <div className="container-fluid p-0 pt-3" style={{ maxWidth: "100%", overflowX: "hidden", overflowY: "auto", backgroundColor: "#f2eeee" }}>
          <div className="row g-2">
            <div className="col-12">
              <div className="bg-white border rounded-2 py-3 ps-3" style={{ height: "calc(100vh - 100px)", overflowY: "auto" }}>
                <div className="d-flex h-100">
                  {/* Question List */}
                  <div className="d-flex flex-column align-items-center" style={{ width: "80px", marginLeft: "-20px" }}>
                    {questions.map((_, index) => (
                      <button
                        key={index}
                        className="btn border border-dark rounded-2 my-1 px-3 mx-auto"
                        style={{
                          width: "50px",
                          height: "55px",
                          backgroundColor: currentQuestion === index ? "#42FF58" : "#fff",
                          color: "#000",
                          cursor: "not-allowed", // Disable navigation through the question list
                          opacity: answeredQuestions[index] !== null || skippedQuestions[index] ? 0.5 : 1
                        }}
                        disabled
                      >
                        Q{index + 1}
                      </button>
                    ))}
                  </div>
                  <div className="col-11 lg-8 me-3" style={{ height: "100%", flex: 1 }}>
                    <div className="border border-dark rounded-2 d-flex flex-column" style={{ height: "calc(100% - 5px)", backgroundColor: "#E5E5E533" }}>
                      <div className="p-3 mt-2">
                        <h4>{questions[currentQuestion].question}</h4>
                        {questions[currentQuestion].options.map((option, index) => (
                          <div key={index} className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="option"
                              value={option}
                              checked={selectedOption === option}
                              onChange={handleOptionChange}
                              disabled={answeredQuestions[currentQuestion] !== null || skippedQuestions[currentQuestion]}
                            />
                            <label className="form-check-label">{option}</label>
                          </div>
                        ))}
                      </div>
                      <div className="d-flex justify-content-end ms-2 mt-5 p-2 me-5 pe-5">
                        <button
                          className="btn btn-sm border btn btn-light border-dark me-2"
                          style={{
                            whiteSpace: "nowrap",
                            minWidth: "100px",
                            height: "35px"
                          }}
                          onClick={handleSubmit}
                          disabled={!selectedOption}
                        >
                          Submit
                        </button>
                        <button
                          className="btn btn-sm border btn btn-light border-dark"
                          style={{
                            whiteSpace: "nowrap",
                            minWidth: "100px",
                            height: "35px"
                          }}
                          onClick={handleNext}
                          disabled={currentQuestion === questions.length - 1}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSubmitConfirmation && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body mt-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <p className="text-center fs-4 fw-bold">Do you want to submit</p>
                <p className="text-center fs-5">Once you submit, you can't resubmit</p>
              </div>
              <div className="d-flex justify-content-end p-3">
                <button
                  type="button"
                  className="btn btn-sm border btn btn-light border-dark me-2"
                  style={{
                    whiteSpace: "nowrap",
                    minWidth: "100px",
                    height: "35px"
                  }}
                  onClick={() => handleConfirmation(false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-sm border btn btn-light border-dark"
                  style={{
                    whiteSpace: "nowrap",
                    minWidth: "100px",
                    height: "35px"
                  }}
                  onClick={() => handleConfirmation(true)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSkipConfirmation && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body mt-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <p className="text-center fs-4 fw-bold">{selectedOption ? "Do you want to skip to the next question?" : "Once skipped, you can't revisit"}</p>
              </div>
              <div className="d-flex justify-content-end p-3">
                <button
                  type="button"
                  className="btn btn-sm border btn btn-light border-dark me-2"
                  style={{
                    whiteSpace: "nowrap",
                    minWidth: "100px",
                    height: "35px"
                  }}
                  onClick={() => handleConfirmation(false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-sm border btn btn-light border-dark"
                  style={{
                    whiteSpace: "nowrap",
                    minWidth: "100px",
                    height: "35px"
                  }}
                  onClick={() => handleConfirmation(true)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default McqTemplate;
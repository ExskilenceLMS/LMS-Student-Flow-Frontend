import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import { useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import eye from "./Components/images/eye.png";
import { Modal, Button } from "react-bootstrap";

interface Data1 {
  timeTaken: string;
  score: {
    user: string;
    total: string;
  };
  result: {
    pass: boolean;
    cutoff: string;
  };
  problems: {
    user: string;
    total: string;
  };
  rank: {
    college: string;
    overall: string;
  };
  time: {
    start: string;
    end: string;
  };
  good: string[];
  average: string[];
  bad: string[];
}
interface question {
  id: number;
  question: string;
  testcase?: string;
  answer?: {
    user: string;
    correct: string;
  };
  options?: [option, option, option, option];
  score: string;
  status: string;
}

interface option {
  data: string;
  user: boolean;
  correct: boolean;
}

interface questionData {
  mcq: question[];
  coding: question[];
}
const TestReport: React.FC = () => {
  const navigate = useNavigate();
  const [choice, setChoice] = useState<"mcq" | "coding">("mcq");
  const [data, setData] = useState<Data1>({
    timeTaken: "1hr 30min / 2hr",
    score: {
      user: "50",
      total: "100",
    },
    result: {
      pass: true,
      cutoff: ">=40%",
    },
    problems: {
      user: "25",
      total: "30",
    },
    rank: {
      college: "5/20",
      overall: "20/120",
    },
    time: {
      start: "Jun 20 2022 09:10:00",
      end: "Jun 20 2022 09:20:00",
    },
    good: [
      "Loop",
      "Datatypes and it is a long text ",
      "Arrays",
      "Function",
      "Map",
      "Filter",
    ],
    average: ["Lambda", "Pandas", "Numpy", "Operators"],
    bad: ["Conditional", "Control", "Data", "Error"],
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<question | null>(null);
  const handleClose = () => setShowModal(false);
  const [questionsData, setQuestionsData] = useState<questionData>({
    mcq: [
      {
        id: 1,
        question:
          "Which of the following SQL queries will select all employees from the 'employees' table where the department is 'Sales'?",
        options: [
          {
            data: "SELECT * FROM employees WHERE department = 'Sales';",
            user: true,
            correct: true,
          },
          {
            data: "SELECT * FROM employees WHERE department = 'HR';",
            user: false,
            correct: false,
          },
          {
            data: "SELECT * FROM employees;",
            user: false,
            correct: false,
          },
          {
            data: "SELECT name, department FROM employees WHERE department = 'Sales';",
            user: false,
            correct: false,
          },
        ],
        score: "10/10",
        status: "correct",
      },
      {
        id: 2,
        question:
          "Which SQL query is used to find the average salary in the 'employees' table?",
        options: [
          {
            data: "SELECT AVG(salary) FROM employees;",
            user: false,
            correct: true,
          },
          {
            data: "SELECT SUM(salary) FROM employees;",
            user: false,
            correct: false,
          },
          {
            data: "SELECT salary FROM employees;",
            user: false,
            correct: false,
          },
          {
            data: "SELECT COUNT(salary) FROM employees;",
            user: false,
            correct: false,
          },
        ],
        score: "0/10",
        status: "skipped",
      },
      {
        id: 3,
        question:
          "Which SQL statement is used to add a new record into the 'employees' table?",
        options: [
          {
            data: "INSERT INTO employees (name, department, salary) VALUES ('John Doe', 'HR', 50000);",
            user: true,
            correct: true,
          },
          {
            data: "INSERT INTO employees (name, salary) VALUES ('John Doe', 50000);",
            user: false,
            correct: false,
          },
          {
            data: "ADD INTO employees (name, department, salary) VALUES ('John Doe', 'HR', 50000);",
            user: false,
            correct: false,
          },
          {
            data: "INSERT RECORD INTO employees (name, department, salary) VALUES ('John Doe', 'HR', 50000);",
            user: false,
            correct: false,
          },
        ],
        score: "10/10",
        status: "correct",
      },
      {
        id: 4,
        question:
          "Which SQL function is used to count the number of rows in the 'employees' table?",
        options: [
          {
            data: "COUNT(*)",
            user: false,
            correct: true,
          },
          {
            data: "SUM(*)",
            user: true,
            correct: false,
          },
          {
            data: "NUMBER(*)",
            user: false,
            correct: false,
          },
          {
            data: "TOTAL(*)",
            user: false,
            correct: false,
          },
        ],
        score: "0/10",
        status: "wrong",
      },
      {
        id: 5,
        question:
          "Which of the following SQL queries will update the salary of 'John Doe' to 55000 in the 'employees' table?",
        options: [
          {
            data: "UPDATE employees SET salary = 55000 WHERE name = 'John Doe';",
            user: false,
            correct: true,
          },
          {
            data: "UPDATE employees SET salary = 55000 WHERE id = 1;",
            user: true,
            correct: false,
          },
          {
            data: "UPDATE employees SET salary = 55000 WHERE department = 'HR';",
            user: false,
            correct: false,
          },
          {
            data: "UPDATE employees SET salary = 55000;",
            user: false,
            correct: false,
          },
        ],
        score: "0/10",
        status: "wrong",
      },
      {
        id: 6,
        question:
          "Which SQL keyword is used to eliminate duplicate records from the result set?",
        options: [
          {
            data: "DISTINCT",
            user: true,
            correct: true,
          },
          {
            data: "NO_DUPLICATES",
            user: false,
            correct: false,
          },
          {
            data: "REMOVE_DUPLICATES",
            user: false,
            correct: false,
          },
          {
            data: "UNIQUE",
            user: false,
            correct: false,
          },
        ],
        score: "10/10",
        status: "correct",
      },
      {
        id: 7,
        question:
          "Which SQL function is used to get the total number of employees in the 'employees' table?",
        options: [
          {
            data: "COUNT(*)",
            user: false,
            correct: true,
          },
          {
            data: "SUM(*)",
            user: true,
            correct: false,
          },
          {
            data: "TOTAL(*)",
            user: false,
            correct: false,
          },
          {
            data: "NUMBER(*)",
            user: false,
            correct: false,
          },
        ],
        score: "0/10",
        status: "wrong",
      },
      {
        id: 8,
        question:
          "Which SQL statement is used to remove a column from the 'employees' table?",
        options: [
          {
            data: "ALTER TABLE employees DROP COLUMN column_name;",
            user: false,
            correct: true,
          },
          {
            data: "REMOVE COLUMN column_name FROM employees;",
            user: true,
            correct: false,
          },
          {
            data: "DELETE COLUMN column_name FROM employees;",
            user: false,
            correct: false,
          },
          {
            data: "ALTER TABLE employees DELETE COLUMN column_name;",
            user: false,
            correct: false,
          },
        ],
        score: "0/10",
        status: "wrong",
      },
      {
        id: 9,
        question:
          "Which SQL query will return all employees whose salary is greater than 50000?",
        options: [
          {
            data: "SELECT * FROM employees WHERE salary > 50000;",
            user: false,
            correct: true,
          },
          {
            data: "SELECT * FROM employees WHERE salary < 50000;",
            user: true,
            correct: false,
          },
          {
            data: "SELECT * FROM employees WHERE salary = 50000;",
            user: false,
            correct: false,
          },
          {
            data: "SELECT * FROM employees WHERE salary >= 50000;",
            user: false,
            correct: false,
          },
        ],
        score: "0/10",
        status: "wrong",
      },
      {
        id: 10,
        question:
          "Which SQL command is used to remove all data from the 'employees' table without deleting the table?",
        options: [
          {
            data: "TRUNCATE TABLE employees;",
            user: false,
            correct: true,
          },
          {
            data: "DELETE FROM employees;",
            user: true,
            correct: false,
          },
          {
            data: "DROP TABLE employees;",
            user: false,
            correct: false,
          },
          {
            data: "CLEAR TABLE employees;",
            user: false,
            correct: false,
          },
        ],
        score: "0/10",
        status: "wrong",
      },
    ],
    coding: [
      {
        id: 1,
        question: "Which of the following SQL queries will select",
        answer: {
          user: "",
          correct: "SELECT * FROM table_name WHERE column_name = 'value';",
        },
        testcase:"0/10",
        score: "0/10",
        status: "skipped",
      },
      {
        id: 2,
        question: "Which of the following SQL queries will select",
        answer: {
          user: "SELECT * from table_name;",
          correct: "SELECT * FROM table_name WHERE column_name = 'value';",
        },
        testcase:"2/10",
        score: "2/10",
        status: "partial",
      },
      {
        id: 3,
        question:
          "Write an SQL query to select all columns from a table named `employees` where the employee's age is greater than 30.",
        answer: {
          user: "SELECT * FROM employees WHERE age > 30;",
          correct: "SELECT * FROM employees WHERE age > 30;",
        },
        testcase:"0/10",
        score: "10/10",
        status: "correct",
      },
      {
        id: 4,
        question:
          "Write an SQL query to find the total number of orders for a customer from the `orders` table. Assume the table has a `customer_id` and `order_id` column.",
        answer: {
          user: "SELECT customer_id, COUNT(order_id) AS total_orders FROM orders GROUP BY customer_id;",
          correct:
            "SELECT customer_id, COUNT(order_id) AS total_orders FROM orders GROUP BY customer_id;",
        },
        testcase:"10/10",
        score: "10/10",
        status: "correct",
      },
      {
        id: 5,
        question:
          "Write an SQL query to get the second highest salary from the `employees` table.",
        answer: {
          user: "SELECT MIN(salary) AS second_highest_salary FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);",
          correct:
            "SELECT MAX(salary) AS second_highest_salary FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);",
        },
        testcase:"0/10",
        score: "0/10",
        status: "wrong",
      },
      {
        id: 6,
        question:
          "Write an SQL query to update the `salary` of the employee with `employee_id` 101 to 50000.",
        answer: {
          user: "UPDATE employees SET salary = 50000 WHERE employee_id = 101;",
          correct:
            "UPDATE employees SET salary = 50000 WHERE employee_id = 101;",
        },
        testcase:"10/10",
        score: "10/10",
        status: "correct",
      },
      {
        id: 7,
        question:
          "Write an SQL query to delete all records from the `orders` table where the order date is older than '2020-01-01'.",
        answer: {
          user: "DELETE FROM orders WHERE order_date < '2020-01-01';",
          correct: "DELETE FROM orders WHERE order_date < '2020-01-01';",
        },
        testcase:"10/10",
        score: "10/10",
        status: "correct",
      },
      {
        id: 8,
        question:
          "Write an SQL query to retrieve the names of employees whose salary is greater than the average salary.",
        answer: {
          user: "SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
          correct:
            "SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
        },
        testcase:"10/10",
        score: "10/10",
        status: "correct",
      },
      {
        id: 9,
        question:
          "Write an SQL query to get the total sales amount by `product_id` from the `sales` table. Assume the table has `product_id` and `sale_amount` columns.",
        answer: {
          user: "SELECT product_id, SUM(sale_amount) AS total_sales FROM sales GROUP BY product_id;",
          correct:
            "SELECT product_id, SUM(sale_amount) AS total_sales FROM sales GROUP BY product_id;",
        },
        testcase:"10/10",
        score: "10/10",
        status: "correct",
      },
      {
        id: 10,
        question:
          "Write an SQL query to retrieve the department names from the `departments` table and the total number of employees in each department. Assume the `employees` table has `department_id`.",
        answer: {
          user: "SELECT d.department_name, COUNT(e.employee_id) AS total_employees FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_name;",
          correct:
            "SELECT d.department_name, COUNT(e.employee_id) AS total_employees FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_name;",
        },
        testcase:"10/10",
        score: "10/10",
        status: "correct",
      },
    ],
  });
  const handleAnswerClick = (data: {
    id: number;
    question: string;
    answer?: {
      user: string;
      correct: string;
    };
    options?: [option, option, option, option];
    score: string;
    status: string;
  }) => {
    setPopupData(data);
    setShowModal(true);
  };
  return (
    <>
      <div style={{ backgroundColor: "#F2EEEE", minHeight: "100vh" }}>
        <Sidebar />
        <div
          className="p-0 my-0 me-2"
          style={{ backgroundColor: "#F2EEEE", marginLeft: "70px" }}
        > 
          <Header />
          <div
            className="container-fluid bg-white mt-2 border pb-4 rounded-1"
            style={{
              height:`calc(100vh - 100px)`,
              overflowY: "scroll",
              backgroundColor: "white",
            }}
          >
            <div className="p-1 pt-4">
              <div className="container-fluid border rounded-2 shadow">
                <div className="row mb-4 pt-2">
                  {data.timeTaken ? (
                    <div className="col">
                      {data.timeTaken}
                      <p>time taken for completion</p>
                    </div>
                  ) : (
                    <div className="col">
                      <span></span>
                    </div>
                  )}

                  {data.score ? (
                    <div className="col">
                      {data.score.user}
                      <p>scored out of {data.score.total}</p>
                    </div>
                  ) : (
                    <div className="col">
                      <span></span>
                    </div>
                  )}

                  {data.result ? (
                    <div className="col">
                      {data.result.pass ? "Passed" : "Failed"}
                      <p>in the test (cutoff score {data.result.cutoff})</p>
                    </div>
                  ) : (
                    <div className="col">
                      <span></span>
                    </div>
                  )}

                  <div className="col"></div>
                </div>
                <div className="row">
                  {data.problems ? (
                    <div className="col">
                      {data.problems.user}
                      <p>Problems attempted out of {data.problems.total}</p>
                    </div>
                  ) : (
                    <div className="col"></div>
                  )}
                  {data.rank ? (
                    <div className="col">
                      <div className="row">
                        <div className="col">
                          {data.rank.college}
                          <p>College Rank</p>
                        </div>
                        <div className="col">
                          {data.rank.overall}
                          <p>Overall Rank</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col"></div>
                  )}
                  {data.time ? (
                    <>
                      <div className="col">
                        {data.time.start}
                        <p>Test Start Time</p>
                      </div>
                      <div className="col">
                        {data.time.end}
                        <p>Test End Time</p>
                      </div>
                    </>
                  ) : (
                    <div className="col"></div>
                  )}
                </div>
              </div>
              <div className="container-fluid mt-5 pb-3 border rounded-2 shadow">
                <div className="row row-cols-5 row-cols-lg-6 row-cols-md-4 row-cols-sm-3 row-cols-xl-8">
                  {data.good.length > 0 ? (
                    <>
                      <span className="mt-2 p-2 ps-3">Very Good :</span>
                      {data.good.map((item) => (
                        <span
                          key={item}
                          style={{ width: "140px" }}
                          role="button"
                          title={item}
                          className="mt-2 d-flex justify-content-center border rounded-2 mx-3  text-center p-1 shadow py-2"
                        >
                          {item.length > 15
                            ? item.substring(0, 15) + "..."
                            : item}
                        </span>
                      ))}
                    </>
                  ) : (
                    <div className=""></div>
                  )}
                </div>
                <div className="row row-cols-5 mt-4 row-cols-lg-6 row-cols-md-4 row-cols-sm-3 row-cols-xl-8">
                  {data.average.length > 0 ? (
                    <>
                      <span className="mt-2 p-2 ps-3">Average in :</span>
                      {data.average.map((item) => (
                        <span
                          key={item}
                          style={{ width: "140px" }}
                          title={item}
                          role="button"
                          className="mt-2 d-flex justify-content-center border rounded-2 mx-3  text-center p-1 shadow py-2"
                        >
                          {item.length > 15
                            ? item.substring(0, 15) + "..."
                            : item}
                        </span>
                      ))}
                    </>
                  ) : (
                    <div className=""></div>
                  )}
                </div>
                <div className="row row-cols-5 mt-4 row-cols-lg-6 row-cols-md-4 row-cols-sm-3 row-cols-xl-8">
                  {data.bad.length > 0 ? (
                    <>
                      <span className="mt-2 p-2 ps-3">Poor in :</span>
                      {data.bad.map((item) => (
                        <span
                          key={item}
                          style={{ width: "140px" }}
                          title={item}
                          role="button"
                          className="mt-2 d-flex justify-content-center border rounded-2 mx-3  text-center p-1 shadow py-2"
                        >
                          {item.length > 15
                            ? item.substring(0, 15) + "..."
                            : item}
                        </span>
                      ))}
                    </>
                  ) : (
                    <div className=""></div>
                  )}
                </div>
              </div>
              <div className="container-fluid mt-5 pb-3 pt-3 border rounded-2 shadow">
                <span
                  onClick={() => setChoice("mcq")}
                  role="button"
                  className={`ms-3 me-5  ${
                    choice === "mcq" ? "border-2 border-bottom" : ""
                  }`}
                >
                  MCQ's
                </span>
                <span
                role="button"
                  onClick={() => setChoice("coding")}
                  className={`ms-3 ${
                    choice === "coding" ? "border-2 border-bottom" : ""
                  }`}
                >
                  Coding
                </span>
                <div className="table-responsive pt-3 px-5">
                  <table className="table">
                    <thead className="">
                      <tr>
                        <th>Q.no</th>
                        <th className="text-center">Question</th>
                        <th>Answer</th>
                        {choice === "coding" && <th>Test Cases</th>}
                        <th>Score</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionsData[choice].length > 0 ? (
                        questionsData[choice].map((question) => (
                          <tr key={question.id}>
                            <td>{question.id}</td>
                            <td> {question.question.length > 80
                            ? question.question.substring(0, 80) + "..."
                            : question.question}</td>
                            <td
                              className="text-center"
                              onClick={() => handleAnswerClick(question)}
                            >
                              <img src={eye} alt="eye" role="button"/>
                            </td>
                            {choice==="coding" && <td>{question.testcase}</td> }
                            <td>{question.score}</td>
                            {question.status === "correct" ? (
                              <td className="text-success">Correct</td>
                            ) : (
                              question.status==="partial"?(<td className="text-warning">Partial</td>):(question.status==="wrong"?<td className="text-danger">Wrong</td>:(question.status==="skipped"?<td className="text-danger">Skipped</td>:<td>{question.status}</td>))

                            )
                            }
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <Modal
                show={showModal}
                onHide={handleClose}
                size="xl"
                className="custom-modal"
                centered
              >
                <Modal.Body className="border border-black rounded-3">
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleClose}
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                  ></button>
                    <h4 className="text-center">Answer</h4>
                  {popupData ? (
                    <div className="p-4">
                      {popupData.question && (
                        <p className="pb-3">
                          {popupData.id}. {popupData.question}
                        </p>
                      )}
                       {popupData.answer && (
                        <>
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col border border-black rounded-3 p-3 px-5 me-4">
                              <p className="fw-bold pb-0 mb-0">Your answer</p>
                              <hr className="mt-0 pt-0"/>
                              <div>
                                {popupData.answer.user}
                              </div>
                            </div>
                            <div className="col border border-black rounded-2 p-3 px-5">
                              <p className="fw-bold pb-0 mb-0">Optimal answer</p>
                              <hr className="mt-0 pt-0"/>
                              <div>
                                {popupData.answer.correct}
                              </div>
                            </div>
                          </div>
                        </div>
                        </>
                       )}
                      {popupData.options &&
                        popupData.options.map((optionItem, index) => {
                          const isUserAnswer = optionItem.user;
                          const isCorrectAnswer = optionItem.correct;
                          const optionstyles =
                            isUserAnswer && isCorrectAnswer
                              ? { color: "green" }
                              : isUserAnswer
                              ? { color: "red" }
                              : isCorrectAnswer
                              ? { color: "green" }
                              : {};
                          return (
                            <div key={index}>
                              <input
                                type="radio"
                                disabled
                                checked={isUserAnswer}
                                className="me-2"
                              />
                              <label
                                htmlFor={`option-${index}`}
                                style={optionstyles}
                              >
                                {optionItem.data}
                                {isUserAnswer && (
                                  <span className="text-dark ps-3">
                                    Your answer
                                  </span>
                                )}
                                {isCorrectAnswer && !isUserAnswer && (
                                  <span className="text-dark ps-3">
                                    Correct answer
                                  </span>
                                )}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    ""
                  )}
                </Modal.Body>
              </Modal>
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

export default TestReport;

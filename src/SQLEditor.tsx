import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Notification from "./Components/images/Notification.png";
import User from "./Components/images/User.png";
import backIcon from "./Components/icons/Back Arrow.png";
import { Button } from "react-bootstrap";
import axios from "axios";
import AceEditor from "react-ace";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-dreamweaver";

interface Data {
  [key: string]: any;
}

interface TestCase {
  [key: string]: string;
}

const SQLEditor: React.FC = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState<string>("");
  const [tableData, setTableData] = useState<Data[]>([]);
  const [expectedOutput, setExpectedOutput] = useState<Data[]>([]);
  const [activeTab, setActiveTab] = useState<string>("table");
  const [sqlQuery, setSqlQuery] = useState<string>("");
  const [runResponse, setRunResponse] = useState<any>(null);
  const [runResponseTable, setRunResponseTable] = useState<Data[]>([]);
  const [runResponseTestCases, setRunResponseTestCases] = useState<TestCase[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [additionalMessage, setAdditionalMessage] = useState<string>("");
  const [executingQuery, setExecutingQuery] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const [tableName, setTableName] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.post(
          "https://exskilence-internships-backend.azurewebsites.net/get/qn/data/",
          {
            StudentId: "24TEST0108",
            Course: "SQL",
            Day: "1",
            Qn_name: "QSQ2405010102BBXXEM02"
          }
        );
        setQuestion(response.data.Question.Qn);
        setTableData(response.data.Tables[0]?.data || []);
        setExpectedOutput(response.data.Question.ExpectedOutput || []);
        setTableName(response.data.Tables[0]?.tab_name || "");
        setTestCases(response.data.Question.TestCases || []);
      } catch (error) {
        console.error("Error fetching the question:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTableNameClick = () => {
    setIsSelected(!isSelected);
  };

  const handleRun = async () => {
    setRunResponseTestCases([]);
    setRunResponseTable([]);
    setClickCount((prevCount) => prevCount + 1);
    setActiveTab("output");
    setProcessing(true);
    setSuccessMessage("");
    setAdditionalMessage("");
    console.log("IronMan", clickCount + 1);

    try {
      setActiveTab("output");
      const updatedSqlQuery = sqlQuery.trim().replace(/\n/g, " ").replace(/;$/, "");
      const sendData = {
        studentId: "24TEST0108",
        query: updatedSqlQuery.replace("/*Write a all SQl commands/clauses in UPPERCASE*/", ""),
        ExpectedOutput: expectedOutput,
        TestCases: testCases,
      };
      if (updatedSqlQuery) {
        const url = "https://surgebackend.azurewebsites.net/runsql/";
        setExecutingQuery(true);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendData),
        });
        const responseData = await response.json();
        setRunResponse(responseData);

        console.log("Full Response:", responseData);
        setRunResponseTable(responseData.data);
        console.log("TableData", responseData.data);
        setRunResponseTestCases(responseData.TestCases);
        console.log("TestCases", responseData.TestCases);
        setExecutingQuery(false);
        const resultField = responseData.TestCases.find((testCase: TestCase) => testCase.Result !== undefined);
        if (resultField) {
          if (resultField.Result === "True") {
            console.log("Batman");
            setSuccessMessage("Congratulations!");
            setAdditionalMessage("You have passed the test cases. Click the submit code button.");
          } else if (resultField.Result === "False") {
            setSuccessMessage("Wrong Answer");
            setAdditionalMessage("You have not passed the test cases");
          }
        }
      } else {
        console.error("SQL query is empty");
      }
    } catch (error) {
      console.error("Error executing SQL query:", error);
      setSuccessMessage("Error");
      setAdditionalMessage("There was an error executing the SQL query.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f2eeee" }}>
        <MoonLoader color="black" loading={loading} size={40} />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0" style={{ height: "100vh", maxWidth: "100%", overflowX: "hidden", overflowY: "auto", backgroundColor: "#f2eeee" }}>
      <Sidebar />
      <div className="p-0 my-0 me-2" style={{ backgroundColor: "#F2EEEE", marginLeft: "70px" }}>
        <div className="container-fluid bg-white border rounded-1 p-3 d-flex justify-content-between">
          <span className="text-center fs-6">
            <img src={backIcon} alt="Back btn" onClick={() => navigate(-1)} className="me-1" /> SQL &gt; Practice Coding
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
                    <button
                      className="btn border border-dark rounded-2 my-1 px-3 mx-auto"
                      style={{ width: "50px", height: "55px", backgroundColor: "#42FF58", color: "#000", cursor: "pointer" }}
                    >
                      Q1
                    </button>
                  </div>
                  <div className="col-5 lg-8" style={{ height: "100%" }}>
                    <div className="border border-dark rounded-2 d-flex flex-column" style={{ height: "calc(100% - 5px)", backgroundColor: "#E5E5E533" }}>
                      <div className="border-bottom border-dark p-3 d-flex justify-content-between align-items-center">
                        <h5 className="m-0">Problem Statement</h5>
                      </div>
                      <div className="p-3 flex-grow-1 overflow-auto" style={{ maxHeight: "calc(100% - 100px)" }}>
                        <p>{question}</p>
                      </div>
                      <div className="mt-auto">
                        <ul className="custom-tabs mt-1 mb-2 mx-3 nav nav-pills" role="tablist" style={{ fontSize: "12px", height: "40px" }}>
                          <li className="nav-item" role="presentation">
                            <button
                              type="button"
                              className={`nav-link me-2 ${activeTab === "table" ? "active" : ""}`}
                              onClick={() => handleTabClick("table")}
                              style={{
                                backgroundColor: activeTab === "table" ? "black" : "transparent",
                                color: activeTab === "table" ? "white" : "black",
                                border: activeTab === "table" ? "none" : "1px solid black",
                              }}
                            >
                              Table
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              type="button"
                              className={`nav-link ${activeTab === "output" ? "active" : ""}`}
                              onClick={() => handleTabClick("output")}
                              style={{
                                backgroundColor: activeTab === "output" ? "black" : "transparent",
                                color: activeTab === "output" ? "white" : "black",
                                border: activeTab === "output" ? "none" : "1px solid black",
                              }}
                            >
                              Expected Output
                            </button>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div role="tabpanel" className={`ms-3 fade tab-pane ${activeTab === "table" ? "active show" : ""}`} style={{ height: "40vh", overflowX: "auto" }}>
                            <div className="d-flex flex-row">
                              <div className="inline-block" style={{ marginBottom: "-1px" }}>
                                <div
                                  className="px-3 py-2 text-white "
                                  style={{
                                    fontSize: "12px",
                                    backgroundColor: "#333",
                                    borderTopLeftRadius: "8px",
                                    borderTopRightRadius: "8px",
                                    boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
                                    position: "relative",
                                    zIndex: 1
                                  }}
                                >
                                  {tableName}
                                </div>
                              </div>
                            </div>
                            <div>
                              {tableData.length > 0 && (
                                <table className="table table-bordered table-sm rounded" style={{ maxWidth: "100vw", width: "20vw", fontSize: "12px" }}>
                                  <thead>
                                    <tr>
                                      {Object.keys(tableData[0]).map((header) => (
                                        <th key={header} className="text-center" style={{ maxWidth: `${100 / Object.keys(tableData[0]).length}vw` }}>
                                          {header}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {tableData.map((row, index) => (
                                      <tr key={index}>
                                        {Object.keys(row).map((header) => (
                                          <td key={header} className="text-center" style={{ whiteSpace: "nowrap", padding: "5px" }}>
                                            {row[header]}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          </div>
                          <div role="tabpanel" className={`ms-3 fade tab-pane ${activeTab === "output" ? "active show" : ""}`} style={{ height: "40vh", overflowX: "auto", fontSize: "12px" }}>
                            <div className="table-responsive" style={{ height: "100%" }}>
                              {expectedOutput.length > 0 && (
                                <table className="table table-bordered table-sm rounded" style={{ maxWidth: "100vw", width: "20vw", fontSize: "12px" }}>
                                  <thead>
                                    <tr>
                                      {Object.keys(expectedOutput[0]).map((header) => (
                                        <th key={header} className="text-center" style={{ maxWidth: `${100 / Object.keys(expectedOutput[0]).length}vw` }}>
                                          {header}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {expectedOutput.map((row, index) => (
                                      <tr key={index}>
                                        {Object.keys(row).map((header) => (
                                          <td key={header} className="text-center" style={{ whiteSpace: "nowrap", padding: "5px" }}>
                                            {row[header]}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column" style={{ flex: "1", height: "100%", marginLeft: "20px" }}>
                    {/* SQL Editor Section - 40% */}
                    <div className="border border-dark rounded-2 me-3" style={{ height: "45%", backgroundColor: "#E5E5E533" }}>
                      <div className="border-bottom border-dark p-3 d-flex justify-content-between align-items-center">
                        <h5 className="m-0">SQL</h5>
                      </div>
                      <AceEditor
                        mode="sql"
                        theme="dreamweaver"
                        onChange={setSqlQuery}
                        value={sqlQuery}
                        fontSize={14}
                        showPrintMargin={false}
                        showGutter={true}
                        highlightActiveLine={false}
                        wrapEnabled={true}
                        className="pe-3"
                        style={{ width: "100%", height: "calc(100% - 60px)" }}
                      />
                    </div>

                    {/* Controls Section - 20% */}
                    <div style={{ height: "9%", padding: "10px 0" }} className="d-flex flex-column justify-content-center me-3">
                      <div className="d-flex justify-content-between align-items-center h-100">
                        <div className="d-flex flex-column justify-content-center">
                          {processing ? (
                            <h5 className="m-0">Processing...</h5>
                          ) : (
                            <>
                              {successMessage && <h5 className="m-0">{successMessage}</h5>}
                              {additionalMessage && <p className="m-0" style={{ fontSize: "12px" }}>{additionalMessage}</p>}
                            </>
                          )}
                        </div>
                        <div className="d-flex justify-content-end align-items-center">
                          <button
                            className="btn btn-sm btn-light me-2 border border-dark"
                            style={{
                              whiteSpace: "nowrap",
                              minWidth: "100px",
                              boxShadow: "rgb(136, 136, 136) 1px 2px 1px",
                              height: "35px"
                            }}
                            onClick={handleRun}
                          >
                            RUN
                          </button>
                          <button
                            className="btn btn-sm border border-dark"
                            style={{
                              backgroundColor: "#FBEFA5DB",
                              whiteSpace: "nowrap",
                              minWidth: "100px",
                              boxShadow: "rgb(136, 136, 136) 1px 2px 1px",
                              height: "35px"
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Output Section - 40% */}
                    <div className="border border-dark rounded-2 me-3" style={{ height: "45%", backgroundColor: "#E5E5E533" }}>
                      <div className="border-bottom border-dark p-3 d-flex justify-content-between align-items-center">
                        <h5 className="m-0">Output</h5>
                      </div>
                      <div className="p-3 overflow-auto" style={{ height: "calc(100% - 60px)" }}>
                        {runResponseTable.length > 0 && (
                          <table className="table table-bordered table-sm rounded" style={{ maxWidth: "100vw", width: "20vw", fontSize: "12px" }}>
                            <thead>
                              <tr>
                                {Object.keys(runResponseTable[0]).map((header) => (
                                  <th key={header} className="text-center" style={{ maxWidth: `${100 / Object.keys(tableData[0]).length}vw` }}>
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {runResponseTable.map((row, index) => (
                                <tr key={index}>
                                  {Object.keys(row).map((header) => (
                                    <td key={header} className="text-center" style={{ whiteSpace: "nowrap", padding: "5px" }}>
                                      {row[header]}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        <div className="mt-3">
                          {runResponseTestCases.map((testCase, index) => (
                            <div
                              key={index}
                              className="d-flex align-items-center mb-2 border border-ligth shadow bg-white rounded p-2 rounded-2"
                              style={{ width: "fit-content", fontSize: "12px" }}
                            >
                              <span className="me-2">{Object.keys(testCase)[0]}:</span>
                              <span style={{ color: Object.values(testCase)[0] === "Passed" ? "blue" : Object.values(testCase)[0] === "True" ? "blue" : "red" }}>
                                {Object.values(testCase)[0]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SQLEditor;

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Components/Sidebar";
import Notification from "./Components/images/Notification.png";
import User from "./Components/images/User.png";
import backIcon from "./Components/icons/Back Arrow.png";
import { Button } from "react-bootstrap";
import AceEditor from "react-ace";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dreamweaver";
import Sk from "skulpt";
import { useNavigate } from "react-router-dom";
interface Example {
  Example: {
    Inputs: string[];
    Output: string;
    Explanation: string;
  };
}

interface TestCase {
  Testcase: {
    Value: string[];
    Output: string;
  };
}

interface QuestionData {
  Qn: string;
  Examples: Example[];
  TestCases: TestCase[];
}

const PyEditor: React.FC = () => {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState<QuestionData>({
    Qn: '',
    Examples: [],
    TestCases: []
  });
  const [pythonCode, setPythonCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [output, setOutput] = useState<string>("");
  const [isWaitingForInput, setIsWaitingForInput] = useState<boolean>(false);
  const [currentInput, setCurrentInput] = useState<string>("");
  const inputResolver = useRef<((value: string) => void) | null>(null);
  const outputRef = useRef<HTMLPreElement>(null);
  const [runResponseTestCases, setRunResponseTestCases] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [additionalMessage, setAdditionalMessage] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/skulpt@1.1.0/dist/skulpt.min.js";
    script.async = true;
    script.onload = () => {
      const builtinScript = document.createElement('script');
      builtinScript.src = "https://cdn.jsdelivr.net/npm/skulpt@1.1.0/dist/skulpt-stdlib.js";
      builtinScript.async = true;
      document.body.appendChild(builtinScript);
    };
    document.body.appendChild(script);

    const fetchQuestion = async () => {
      try {
        const response = await axios.post(
          "https://exskilence-internships-backend.azurewebsites.net/get/qn/data/",
          {
            StudentId: "24TEST0108",
            Course: "Python",
            Day: "4",
            Qn_name: "QPY2405030003AXXEM02"
          }
        );
        setQuestionData(response.data.Question);
      } catch (error) {
        console.error("Error fetching the question:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLPreElement>) => {
    if (!isWaitingForInput) return;

    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputResolver.current) {
        const inputValue = currentInput;
        setOutput(prev => prev + '\n'); // Only add newline, not the input value again
        inputResolver.current(inputValue);
        inputResolver.current = null;
        setIsWaitingForInput(false);
        setCurrentInput("");
      }
    } else if (event.key === 'Backspace') {
      event.preventDefault();
      if (currentInput.length > 0) {
        setCurrentInput(prev => prev.slice(0, -1));
        // Remove last character from output
        setOutput(prev => prev.slice(0, -1));
      }
    } else if (event.key.length === 1) {
      event.preventDefault();
      setCurrentInput(prev => prev + event.key);
      setOutput(prev => prev + event.key);
    }
  };

  const promptInput = (prompt: string) => {
    return new Promise<string>((resolve) => {
      setOutput(prev => prev + prompt);
      setIsWaitingForInput(true);
      inputResolver.current = resolve;
      if (outputRef.current) {
        outputRef.current.focus();
      }
    });
  };

  const handleRunPython = () => {
    setOutput('');
    setIsWaitingForInput(false);
    setCurrentInput('');
    inputResolver.current = null;

    function builtinRead(x: string) {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
        throw new Error("File not found: '" + x + "'");
      }
      return Sk.builtinFiles["files"][x];
    }

    Sk.configure({
      output: (text: string) => setOutput(prev => prev + text),
      read: builtinRead,
      inputfun: promptInput,
    });

    const myPromise = Sk.misceval.asyncToPromise(() => {
      return Sk.importMainWithBody('<stdin>', false, pythonCode, true);
    });

    myPromise.then(
      () => {
        console.log('success');
      },
      (err: any) => {
        setOutput(prev => prev + err.toString());
      }
    );
  };

  const handleCheckCode = async () => {
    setOutput('');
    setIsWaitingForInput(false);
    setCurrentInput('');
    inputResolver.current = null;
    setProcessing(true);
    setSuccessMessage("");
    setAdditionalMessage("");

    function builtinRead(x: string) {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
        throw new Error("File not found: '" + x + "'");
      }
      return Sk.builtinFiles["files"][x];
    }

    Sk.configure({
      output: (text: string) => setOutput(prev => prev + text),
      read: builtinRead,
      inputfun: promptInput,
    });

    const myPromise = Sk.misceval.asyncToPromise(() => {
      return Sk.importMainWithBody('<stdin>', false, pythonCode, true);
    });

    myPromise.then(
      () => {
        console.log('success');
      },
      (err: any) => {
        setOutput(prev => prev + err.toString());
      }
    );

    try {
      const postData = {
        studentId: "24TEST0108",
        Day_no: "1",
        Subject: "Python",
        Qn: questionData.Qn,
        Code: pythonCode,
        Result: output.trimEnd(),
        CallFunction: "",
        TestCases: questionData.TestCases,
        Attempt: 0
      };

      const response = await axios.post(
        "https://exskilence-internships-backend.azurewebsites.net/runpy12/",
        postData
      );

      const responseData = response.data;
      const testCases = responseData.TestCases;
      const firstTestCase = testCases[0];

      const filteredTestCases = testCases.slice(1).map(({ Result, ...rest }: { Result: any, [key: string]: any }) => rest);

      const updatedTestCases = await Promise.all(
        filteredTestCases.map(async (testCase: { [key: string]: any }) => {
          try {
            const testCaseKey = Object.keys(testCase)[0];
            const { Code, Output } = testCase[testCaseKey];

            if (!Code) {
              console.error("Test case has an undefined 'Code' property.");
              return { ...testCase, Result: "Error: Code is undefined" };
            }

            let testCaseOutput = "";
            Sk.configure({
              output: (text: string) => {
                testCaseOutput += text.replace("<module '__main__' from '<stdin>.py'>", "");
              },
              read: builtinRead,
            });

            const executePython = async () => {
              try {
                await Sk.misceval.asyncToPromise(() =>
                  Sk.importMainWithBody("<stdin>", false, Code, true)
                );
                return testCaseOutput.trim();
              } catch (err: unknown) {
                console.error("Error executing Python code for TestCaseId:", testCase.TestCaseId, err);
                return (err as Error).toString();
              }
            };

            const actualOutput = await executePython();
            testCase.Result = actualOutput === Output ? "Passed" : "Failed";
            return testCase;
          } catch (error) {
            console.error("Unexpected error while processing test case:", testCase, error);
            return { ...testCase, Result: "Error: Unexpected error occurred" };
          }
        })
      );

      const formattedTestCases = updatedTestCases.map((testCase, index) => {
        return { [`TestCase${index + 2}`]: testCase.Result };
      });

      const newTestCases = [firstTestCase, ...formattedTestCases];
      const otherTestCases = newTestCases.slice(0, -1).map(({ Result, ...rest }) => rest);

      const allPassed = otherTestCases.every((testCase) => {
        return Object.values(testCase)[0] === 'Passed';
      });
      const resultTestCase = { Result: allPassed ? "True" : "False" };
      const updatedTestCases12 = [...otherTestCases, resultTestCase];
      setRunResponseTestCases(updatedTestCases12);

      if (allPassed) {
        setSuccessMessage("Congratulations!");
        setAdditionalMessage("You have passed all the test cases. Click the submit code button.");
      } else {
        setSuccessMessage("Wrong Answer");
        setAdditionalMessage("You have not passed all the test cases.");
      }
    } catch (error) {
      console.error("Error executing the code:", error);
      setSuccessMessage("Error");
      setAdditionalMessage("There was an error executing the code.");
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
    <div className="container-fluid p-0" style={{ height: "100vh", maxWidth: "100%", overflowX: "hidden", backgroundColor: "#f2eeee" }}>
      <Sidebar />
      <div className="p-0 my-0 me-2" style={{ backgroundColor: "#F2EEEE", marginLeft: "70px" }}>
        <div className="container-fluid bg-white border rounded-1 p-3 d-flex justify-content-between">
          <span className="text-center fs-6">
            <img src={backIcon} alt="Back btn" onClick={() => navigate(-1)} className="me-1" /> Python &gt; Practice Coding
          </span>
          <span className="">
            <img src={Notification} alt="Notification" className="me-3" />
            <img className="me-2" src={User} alt="User" />
          </span>
        </div>
        <div className="container-fluid p-0 pt-3" style={{ maxWidth: "100%", overflowX: "hidden", backgroundColor: "#f2eeee" }}>
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
                  {/* Question Section */}
                  <div className="col-5 lg-8" style={{ height: "100%" }}>
                    <div className="border border-dark rounded-2 d-flex flex-column" style={{ height: "calc(100% - 5px)", backgroundColor: "#E5E5E533" }}>
                      <div className="border-bottom border-dark p-3 d-flex justify-content-between align-items-center">
                        <h5 className="m-0">Problem Statement</h5>
                      </div>
                      <div className="p-3 flex-grow-1 overflow-auto me-1" >
                        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{questionData.Qn}</pre>

                        {questionData.Examples && questionData.Examples.length > 0 && (
                          <div className="mt-3">
                            <h6>Examples:</h6>
                            {questionData.Examples.map((example, index) => (
                              <div key={index} className="border border-dark rounded-2 p-2 mb-2 bg-light">
                                <div className="mb-1">
                                  <strong>Input:</strong>
                                  <pre className="m-0" style={{ whiteSpace: 'pre-wrap' }}>
                                    {example.Example.Inputs && example.Example.Inputs.join('\n')}
                                  </pre>
                                </div>
                                <div className="mb-1">
                                  <strong>Output:</strong>
                                  <pre className="m-0" style={{ whiteSpace: 'pre-wrap' }}>{example.Example.Output}</pre>
                                </div>
                                {example.Example.Explanation && (
                                  <div>
                                    <strong>Explanation:</strong>
                                    <p className="m-0">{example.Example.Explanation}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Editor Section */}
                  <div className="d-flex flex-column" style={{ flex: "1", height: "100%", marginLeft: "20px" }}>
                    {/* Code Editor */}
                    <div className="border border-dark rounded-2 me-3" style={{ height: "45%", backgroundColor: "#E5E5E533" }}>
                      <div className="border-bottom border-dark p-3 d-flex justify-content-between align-items-center">
                        <h5 className="m-0">Python Code</h5>
                      </div>
                      <AceEditor
                        mode="python"
                        theme="dreamweaver"
                        value={pythonCode}
                        onChange={setPythonCode}
                        fontSize={16}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        wrapEnabled={true}
                        setOptions={{ useWorker: false }}
                        style={{ width: "100%", height: "calc(100% - 60px)" }}
                      />
                    </div>

                    {/* Controls */}
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
                          <Button
                            variant="light"
                            className="me-2 border border-dark"
                            onClick={handleRunPython}
                            style={{
                              minWidth: "100px",
                              boxShadow: "1px 2px 1px #888"
                            }}
                          >
                            RUN
                          </Button>
                          <Button
                            variant="warning"
                            className="border border-dark"
                            onClick={handleCheckCode}
                            style={{
                              backgroundColor: "#FBEFA5DB",
                              minWidth: "100px",
                              boxShadow: "1px 2px 1px #888"
                            }}
                          >
                            CHECK TESTCASES
                          </Button>
                          <Button
                            variant="warning"
                            className="border border-dark ms-2"
                            onClick={handleCheckCode}
                            style={{
                              backgroundColor: "#FBEFA5DB",
                              minWidth: "100px",
                              boxShadow: "1px 2px 1px #888"
                            }}
                          >
                            SUBMIT
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Output Section */}
                    <div className="border border-dark rounded-2 me-3" style={{ height: "45%", backgroundColor: "#E5E5E533" }}>
                      <div className="border-bottom border-dark p-3 d-flex justify-content-between align-items-center">
                        <h5 className="m-0">Output</h5>
                      </div>
                      <div className="p-3 overflow-auto" style={{ height: "calc(100% - 60px)" }}>
                        <pre
                          className="m-0"
                          id="output"
                          ref={outputRef}
                          tabIndex={0}
                          onKeyDown={handleKeyPress}
                          style={{ outline: 'none' }}
                        >
                          {output}
                        </pre>
                        {runResponseTestCases && (
                          <div className="col mt-3 mb-5">
                            {runResponseTestCases.map((testCase, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-center mb-2 border border-ligth shadow bg-white rounded p-2 rounded-2"
                                    style={{ width: "fit-content", fontSize: "12px" }}
                                >
                                    <span className="me-2">{Object.keys(testCase)[0]}:</span>
                                    <span style={{ color: Object.values(testCase)[0] === "Passed" ? "blue" : Object.values(testCase)[0] === "True" ? "blue" : "red" }}>
                                    {Object.values(testCase)[0] as React.ReactNode}
                                    </span>
                                </div>
                            ))}

                          </div>
                        )}
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

export default PyEditor;

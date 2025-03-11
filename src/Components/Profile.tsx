import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileImg from "./images/Profile.png";
import Rank from "./images/Rank.png";
import ProgressMeter from "./images/ProgressMeter.png";
import Badge from "./images/Badge.png";
import Hourglass from "./images/Hourglass.png";
import Edit from "./images/Edit.png";
import Person from "./images/Person.png";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

interface ProfileData {
  score?: string;
  college_rank?: string;
  overall_rank?: string;
  category?: string;
  hour_spent?: string;
  name?: string;
  student_id?: string;
}

function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState<ProfileData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/studentdashboard/summary/25MRITCS001/`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="row px-1 mx-1 my-2 py-3 rounded-3"
      style={{ backgroundColor: "#212f3d" }}
    >   
      <div className="col-4 col-xl-3 m-0 p-0 justify-content-center">
        {data.name ? null : <div style={{ width: "100px", height: "100px", marginLeft: "30px" }}>
          {/* <Skeleton circle height={100} width={100} containerClassName="p-0 " style={{ marginBottom: "20px" }} /> */}
          {/* <Skeleton height={20} width={100} containerClassName="text-center p-0" />
          <Skeleton height={10} width={100} containerClassName="text-center p-0" /> */}
        </div>}
        <div className="row justify-content-center">
        <img
            src={Person}
            alt="Profile"
            className=" rounded-circle p-0"
            style={{ width: "100px", height: "100px" }}
          /> 
        </div>
        <div className="d-flex justify-content-end pe-5 me-3 " onClick={() => navigate('/profile')}>
            <img
              src={Edit}
              alt="Profile"
              className="img m-0 p-0 mb-3 d-flex flex-end pr-auto justify-content-end text-end"
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              title="Edit Profile"
            />
          </div>
        <div className="row">
          <h5 className="text-center">{data.name}</h5>
          <p className="text-center text-secondary fw-bold">{data.student_id}</p>
        </div>
      </div>
      <div className="col-8 col-xl-9 m-0 p-0">
        <div className="text-white">
          <div className="container">
            <div className="row mb-3">
              <div className="col text-center border-1 border-end ">
                <div className="row">
                  <div className="col p-0 ps-2 m-0 d-flex me-auto justify-content-center text-center">
                    <div
                      className="border border-2 border-light rounded-circle  d-flex justify-content-center align-items-center"
                      style={{ height: "50px", width: "50px" }}
                    >
                      <img src={ProgressMeter} className="" alt="Profile" />
                    </div>
                  </div>
                  <div className="col p-0 px-2 m-0 text-start ">
                    {data.score ? (
                      <>
                        <h6>{data.score}</h6>
                        <p
                          className="mb-0 fw-light "
                          style={{ fontSize: "12px" }}
                        >
                          Score
                        </p>
                      </>
                    ) : (
                      <Skeleton height={40} width={50} containerClassName="text-center p-0" />
                    )}
                  </div>
                </div>
              </div>
              <div className="col text-center ">
                <div className="row">
                  <div className="col p-0 ps-2 m-0 d-flex me-auto justify-content-center text-center">
                    <div
                      className="border border-2 border-light rounded-circle d-flex justify-content-center align-items-center"
                      style={{ height: "50px", width: "50px" }}
                    >
                      <img src={Rank} className="" alt="rank" />
                    </div>
                  </div>
                  <div className="col p-0 m-0 px-2 text-center ">
                  {data.college_rank ? (
                    <div className="row">
                      <div className="col p-0 m-0">
                      {data.college_rank ? (
                      <>
                        <h6>{data.college_rank}</h6>
                        <p
                          className="mb-0 fw-light"
                          style={{ fontSize: "12px" }}
                        >
                          College Rank
                        </p>
                      </>
                    ) : (
                      <Skeleton height={40} width={50} containerClassName="text-center p-0" />
                    )}
                      </div>
                      <div className="col p-0 m-0">
                      {data.overall_rank ? (
                      <>
                        <h6>{data.overall_rank}</h6>
                        <p
                          className="mb-0 fw-light"
                          style={{ fontSize: "12px" }}
                        >
                          Overall Rank
                        </p>
                      </>
                    ) : (
                      <Skeleton height={40} width={50}  containerClassName="text-center p-0" />
                    )}
                      </div>
                    </div>
                  ):(                      
                    <Skeleton height={80} width={80}  containerClassName="text-center p-0" />
                  )
                }
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-5">
                <hr style={{ borderColor: "white", opacity: "1" }} />
              </div>
              <div className="col-2 text-center text-white fw-bolder fs-5">
                +
              </div>
              <div className="col-5">
                <hr style={{ borderColor: "white", opacity: "1" }} />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col text-center border-1 border-end ">
                <div className="row">
                  <div className="col p-0 ps-2 m-0 d-flex me-auto justify-content-center text-center">
                    <div
                      className="border border-2 border-light rounded-circle d-flex justify-content-center align-items-center"
                      style={{ height: "50px", width: "50px" }}
                    >
                      <img src={Badge} className="" alt="badge" />
                    </div>
                  </div>
                  <div className="col p-0 px-2 m-0  text-start">
                    {data.category ? (
                      <>
                        <h6>{data.category}</h6>
                        <p
                          className="mb-0 fw-light"
                          style={{ fontSize: "12px" }}
                        >
                          Category
                        </p>
                      </>
                    ) : (
                      <Skeleton height={40} width={50}  containerClassName="text-center p-0" />

                    )}
                  </div>
                </div>
              </div>
              <div className="col text-center ">
                <div className="row">
                  <div className="col p-0 ps-2 m-0 d-flex me-auto justify-content-center text-center">
                    <div
                      className="border border-2 border-light rounded-circle d-flex justify-content-center align-items-center"
                      style={{ height: "50px", width: "50px" }}
                    >
                      <img src={Hourglass} className="" alt="Hourglass" />
                    </div>
                  </div>
                  <div className="col p-0 m-0 px-2 text-center">
                    {data.hour_spent ? (
                      <>
                        <h6>{data.hour_spent}</h6>
                        <p
                          className="mb-0 fw-light"
                          style={{ fontSize: "12px" }}
                        >
                          Hours Spent
                        </p>
                      </>
                    ) : (
                      <Skeleton height={40} width={50} containerClassName="text-center p-0" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

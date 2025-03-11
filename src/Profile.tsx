import React, { useState, useEffect } from "react";
import { FaLinkedin, FaCode, FaHackerrank, FaRegEdit } from "react-icons/fa"; 
import Notification from "./Components/images/Notification.png";
import Back from "./Components/images/Back.png";
import User from "./Components/images/User.png";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";
interface Education {
  Degree: string;
  Branch: string;
  Institution: string;
  CGPA: string;
}

interface ProfileData {
  id: string;
  name: string;
  Course: string;
  Subjects: string;
  Batch: string;
  Category: string;
  College: string;
  Branch: string;
  image: string;
  email: string;
  phone: string;
  linkedin: string;
  leetcode: string;
  hackerrank: string;
  Gender: string;
  Address: string;
  Education: Education[];
}

interface Profile {
  data: ProfileData;
}

const Profile: React.FC = () => {
  const [data, setData] = useState<any>({});
  const navigate = useNavigate();
  const [profile] = useState<Profile>({
    data: {
      id: "24test0108",
      name: "Student1",
      Course: "Full Stack ",
      Subjects: "SQL, Python, DSA",
      Batch: "Batch 1",
      Category: "Moon",
      College: "East West Institute of Technology",
      Branch: "CSE",
      image: "https://storeholder.blob.core.windows.net/tpdata/Concept/course/123456789/Personfprofile.jpg",
      email: "ranjithaann@gmail.com",
      phone: "9900061111",
      linkedin: "https://www.linkedin.com/in/ranjithaann",
      leetcode: "https://www.linkedin.com/in/ranjithaann",
      hackerrank: "https://www.hackerrank.com/ranjithaann",
      Gender: "female",
      Address: "Kochi",
      Education: [
        {
          Degree: "B.Tech",
          Branch: "CSE",
          Institution: "East West Institute of Technology",
          CGPA: "8.5",
        },
        {
          Degree: "12th",
          Branch: "Science",
          Institution: "St. Albert's High School",
          CGPA: "9.5",
        },
        {
          Degree: "10th",
          Branch: "Science",
          Institution: "St. Albert's High School",
          CGPA: "9.5",
        },
      ],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://storeholder.blob.core.windows.net/tpdata/FAQ/faq.json"
      );
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result as string);
          setData(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.readAsText(blob);
    };

    fetchData();
  }, []);
  return (
    <div style={{ backgroundColor: "#F2EEEE", minHeight: "100vh" }}>
        <Sidebar />
        <div
          className="p-0 my-0 me-2"
          style={{ backgroundColor: "#F2EEEE", marginLeft: "70px" }}
        >
          <Header/>
    <div className="container-fluid p-0 pt-3" style={{maxWidth: "100%", overflowX: "hidden", overflowY: "auto", backgroundColor: "#f2eeee"}}>
            <div className="row g-2"> {/* Added g-3 for 0.7rem gap */}
              <div className="col-12 col-md-3 col-sm-12">
                <div className="bg-white border rounded-2 py-2 ps-2" style={{ height: `calc(100vh - 100px)`, overflowY: "auto" }}>
                  <div className="m-3">
                    <div className="border-black border-bottom w-75 mx-auto pb-3">
                    {profile.data.image && (
                        <div className="d-flex justify-content-center align-items-center position-relative">
                          <img
                            className="border rounded-pill"
                            src={profile.data.image}
                            alt="Profile"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                          />
                          <FaRegEdit
                            size={25}
                            className="text-dark position-absolute bottom-0 end-0 translate-middle-x"
                            style={{ right: "10px", bottom: "-5px" }} // You can adjust these values as needed
                          />
                        </div>
                      )}


                      {profile.data.id && (
                        <p className="text-center m-0 mt-2 fs-5 fw-bold">
                          {profile.data.id}
                        </p>
                      )}
                      {profile.data.name && (
                        <p className="text-center m-0 fs-5 fw-bold">
                          {profile.data.name}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="m-3">
                    <div className="border-black border-bottom w-75 mx-auto">
                      {profile.data.Course && (
                        <p className="m-0 fs-6 row mb-3">
                          <strong className="col">Course</strong>
                          <span className="col">{profile.data.Course}</span>
                        </p>
                      )}
                      {profile.data.Batch && (
                        <p className="m-0 fs-6 mb-3 row">
                          <strong className="col">Batch</strong>
                          <span className="col">{profile.data.Batch}</span>
                        </p>
                      )}
                      {profile.data.Subjects && (
                        <p className="m-0 fs-6 row mb-3">
                          <strong className="col">Subjects</strong>
                          <span className="col">{profile.data.Subjects}</span>
                        </p>
                      )}
                      {profile.data.Category && (
                        <p className="m-0 fs-6 row mb-3">
                          <strong className="col">Category</strong>
                          <span className="col">{profile.data.Category}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="fw-bold ps-4 mb-3" style={{fontSize: "18px"}}>
                      Social Media Platforms
                      {/* <img src={editIcon} alt="Edit Icon" className="ms-3 w-76 h-76" /> */}
                      <FaRegEdit size={25} className="text-dark ms-2" />
                    </p>
                    <div className="left-4 ms-5">
            
                  {/* {profile.data.linkedin && (
                    <p className="m-0 mb-3 fs-6 row">
                      <strong className="col text-center">LinkedIn</strong>
                      <span className="col">
                        <a
                          href={profile.data.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin size={20} className="text-dark" />
                        </a>
                      </span>
                    </p>
                  )}
                  {profile.data.leetcode && (
                    <p className="m-0 mb-3 fs-6 row">
                      <strong className="col text-center">LeetCode</strong>
                      <span className="col">
                        <a
                          href={profile.data.leetcode}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaCode size={20} className="text-dark" />
                        </a>
                      </span>
                    </p>
                  )}
                  {profile.data.hackerrank && (
                    <p className="m-0 mb-3 fs-6 row">
                      <strong className="col text-center">HackerRank</strong>
                      <span className="col ">
                        <a
                          href={profile.data.hackerrank}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaHackerrank size={20} className="text-dark" />
                        </a>
                      </span>
                    </p>
                  )} */}
                  {profile.data.linkedin && (
                    <p className="m-3 mb-3 fs-6 row align-items-center">
                      <span className="col-auto">
                        <a
                          href={profile.data.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin size={20} className="text-dark me-2" />
                        </a>
                      </span>
                      <strong className="col-auto me-3" >LinkedIn</strong>
                    </p>
                  )}
                  {profile.data.leetcode && (
                    <p className="m-3 mb-3 fs-6 row align-items-center">
                      <span className="col-auto">
                        <a
                          href={profile.data.leetcode}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaCode size={20} className="text-dark me-2" />
                        </a>
                      </span>
                      <strong className="col-auto">LeetCode</strong>
                    </p>
                  )}
                  {profile.data.hackerrank && (
                    <p className="m-3 mb-3 fs-6 row align-items-center">
                      <span className="col-auto">
                        <a
                          href={profile.data.hackerrank}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaHackerrank size={20} className="text-dark me-2" />
                        </a>
                      </span>
                      <strong className="col-auto">HackerRank</strong>
                    </p>
                  )}


              </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-9 col-sm-12">
                <div className="bg-white border rounded-2 py-2 ps-2" style={{height: `calc(100vh - 100px)`, overflowY: "auto"}}>
                  <div className="border border-dark rounded-2 mx-4 mt-3">
                    <p className="fs-4 fw-bold ps-4 pt-3">Profile details</p>
                    <div className="row mx-5">
                      <div className="col-6 ps-5">
                        {profile.data.College && (
                          <span className="">
                            <span className="fs-5 fw-bold">College</span>
                            <br />
                            <span>{profile.data.College}</span>
                            <br />
                            <br />
                          </span>
                        )}
                         {profile.data.Gender && (
                        <span className="">
                          <span className="fs-5 fw-bold">Gender</span>
                          <br />
                          <span>{profile.data.Gender}</span>
                          <br />
                          <br />
                        </span>
                      )}
                      {profile.data.email && (
                        <span className="">
                          <span className="fs-5 fw-bold">Email Address</span>
                          <br />
                          <span>{profile.data.email}</span>
                          <br />
                          <br />
                        </span>
                      )}
                      </div>
                      <div className="col-6 ps-5">
                      {profile.data.Branch && (
                        <span className="">
                          <span className="fs-5 fw-bold">Branch</span>
                          <br />
                          <span>{profile.data.Branch}</span>
                          <br />
                          <br />
                        </span>
                      )}
                      {profile.data.Address && (
                        <span className="">
                          <span className="fs-5 fw-bold">Address</span>
                          <br />
                          <span>{profile.data.Address}</span>
                          <br />
                          <br />
                        </span>
                      )}
                       {profile.data.phone && (
                        <span className="">
                          <span className="fs-5 fw-bold">Phone Number</span>
                          <br />
                          <span>{profile.data.phone}</span>
                          <br />
                          <br />
                        </span>
                      )}
                      </div>
                    </div>
                  </div>
                  <div className="border border-dark rounded-2 mx-4 mt-3">
                    <p className="fs-4 fw-bold ps-3 pt-3">Education details</p>
                    <div className="mx-5">
                    <table
                      className="table table-borderless"
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <thead>
                        <tr className="border-black border-bottom mx-auto">
                          <th className="p-3 text-center fs-5">Degree</th>
                          <th className="p-3 text-center fs-5">Institution</th>
                          <th className="p-3 text-center fs-5">Branch</th>
                          <th className="p-3 text-center fs-5">CGPA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profile.data.Education.map((edu, index) => (
                          <tr key={index}>
                          <td className="p-3 text-center ">{edu.Degree}</td>
                          <td className="p-3 text-center">{edu.Institution}</td>
                          <td className="p-3 text-center">{edu.Branch || "--"}</td>
                          <td className="p-3 text-center">{edu.CGPA}</td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
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
};

export default Profile;
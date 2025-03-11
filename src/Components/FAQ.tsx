import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Back from "./images/Back.png";
import User from "./images/User.png";
import Notification from "./images/Notification.png";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; 
interface FAQData {
  FAQ: {
    [category: string]: { question: string; answer: string }[];
  };
}

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FAQData | null>(null);

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
          console.log("first", jsonData);
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
    <>
      <div style={{ backgroundColor: "#F2EEEE", minHeight: "100vh" }}>
        <Sidebar />
        <div
          className="p-0 my-0 me-2"
          style={{ backgroundColor: "#F2EEEE", marginLeft: "70px" }}
        >
          <Header/>
          <div className="container-fluid bg-white mt-4 border rounded-1">
            <div className="ps-2 pt-2">
              {data?.FAQ ? (
                Object.entries(data.FAQ).map(([category, questions]) => (
                  <div key={category}>
                    <span className="fs-6 mb-5">{category}</span>
                    <ul style={{ listStyle: "decimal" }}>
                      {questions.map((item, index) => (
                        <li key={index}>
                          <p className="m-0">{item.question}</p>
                          <p className="m-0">{item.answer}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>Loading FAQ data...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;

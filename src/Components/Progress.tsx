import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";


interface Subject {
  id: string;
  name: string;
}

interface Week {
  id: string;
  name: string;
}

interface ProgressData {
  id: string;
  label: string;
  value: number;
  max: number;
  color: string;
}
interface Delay {
  delay: number;
}
function Progress() {
  const [subjects] = useState<Subject[]>([
    { id: "1", name: "All" },
    { id: "2", name: "SQL" },
    { id: "3", name: "DSA" },
    { id: "4", name: "Python" },
  ]);

  const [weeks] = useState<Week[]>([
    { id: "1", name: "Week 1" },
    { id: "2", name: "Week 2" },
    { id: "3", name: "Week 3" },
    { id: "4", name: "Week 4" },
    { id: "5", name: "Week 5" },
    { id: "6", name: "Week 6" },
  ]);

  const [progressData] = useState<ProgressData[]>([
    { id: "1", label: "Weekly Test", value: 38, max: 50, color: "#1C00BB" },
    {
      id: "2",
      label: "Practice Coding",
      value: 65,
      max: 100,
      color: "#12B500",
    },
    { id: "3", label: "Practice MCQs", value: 42, max: 50, color: "#930000" },
  ]);
  const [delay] = useState<Delay>({ delay: 5 });
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedWeek, setSelectedWeek] = useState<string>("");

  return (
    <div className="container ms-3">
      <div className="row">
        <div className="col">
          <p>My Progress</p>
        </div>
        <div className="col">
          <select
          style={{cursor: "pointer"}}
            id="subjectDropdown"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-dark text-white"
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <select
          style={{cursor: "pointer"}}
            id="weekDropdown"
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="bg-dark text-white"
          >
            {weeks.map((week) => (
              <option key={week.id} value={week.id}>
                {week.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mt">
        <div className="col-md-6 d-flex justify-content-center">
          <div
            style={{ position: "relative", width: "150px", height: "150px" }}
          >
            <svg className="" viewBox="0 0 200 200">
              {progressData.map((data, index) => {
                const strokeWidth = 12;
                const radius = 90 - index * 30;
                const circumference = 2 * Math.PI * radius;
                const dashArray = circumference;
                const dashOffset = circumference * (1 - data.value / data.max);

                return (
                  <g key={data.id}>
                    <circle
                      cx="100"
                      cy="100"
                      r={radius}
                      stroke="gray"
                      strokeWidth={strokeWidth}
                      fill="none"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r={radius}
                      stroke={data.color}
                      strokeWidth={strokeWidth}
                      strokeDasharray={dashArray}
                      strokeDashoffset={dashOffset}
                      fill="none"
                      style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "100px 100px",
                      }}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="col-md-6 text-white ps-5">
          <ul className="list-unstyled">
            {progressData.map((data) => (
              <li
                key={data.id}
                className="d-flex justify-content-between align-items-center mb-2 ps-2"
                style={{
                  borderLeft: `5px solid ${data.color}`,
                }}
              >
                <div style={{ fontSize: "12px" }}>
                  <p className="mb-0">
                    {data.value}/{data.max}
                  </p>
                  <p className="mb-0">{data.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="d-flex justify-content-between border-top mt-3 border-secondary">
        <span>Delay</span>
        <span>
          <b>{delay.delay}</b> Days
        </span>
      </div>
    </div>
  );
}

export default Progress;

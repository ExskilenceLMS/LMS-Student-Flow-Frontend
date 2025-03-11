import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

interface DataItem {
  day_name: string;
  hours: number;
  isUpcoming?: boolean;
  isCurrent?: boolean;
}

const Activity: React.FC = () => {
  const [data, setData] = useState<DataItem[] | null>(null);
  const [minThreshold, setMinThreshold] = useState(0);
  const [weeklyLimit, setWeeklyLimit] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/studentdashboard/hourspent/25MRITCS001/n/");
        console.log("Initial Data:", response.data);
        setData(response.data.hours);
        setWeeklyLimit(response.data.weekly_limit);
        setMinThreshold(response.data.daily_limit);
        setSelectedWeek(response.data.weekly_limit);
        console.log("Weekly Limit:", response.data.weekly_limit);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedWeek > 0) {
      console.log("Fetching data for week:", selectedWeek);
      fetchHoursSpentForWeek(selectedWeek);
    }
  }, [selectedWeek]);

  const fetchHoursSpentForWeek = async (weekNumber: number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/studentdashboard/hourspent/25MRITCS001/${weekNumber}/`);
      console.log("Data for week", weekNumber, ":", response.data);
      setData(response.data.hours);
      setMinThreshold(response.data.daily_limit);
    } catch (error) {
      console.error("Error fetching data for week", weekNumber, ":", error);
    }
  };

  const total = data ? data.reduce((acc, curr) => acc + curr.hours, 0) : 0;

  const getHoursOrThreshold = (entry: DataItem): number => {
    return entry.hours === 0 ? minThreshold : entry.hours;
  };

  const getBarColor = (entry: DataItem): string => {
    if (entry.isUpcoming) return "#E5E5E5";
    if (entry.isCurrent) return "#8B00FF";
    if (entry.hours === 0) return "#E5E5E5"; 
    return "#E7C6FF";
  };

  return (
    <div className="p-0" style={{ fontFamily: "Arial, sans-serif" }}>
      <div className="bg-white rounded-2 px-2 py-1">
        <div className="p-2">
          <span
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Activity
          </span>
          <select
            className="float-end"
            style={{ cursor: "pointer" }}
            value={selectedWeek}
            onChange={(e) => {
              console.log("Selected week:", e.target.value);
              setSelectedWeek(Number(e.target.value));
            }}
          >
            {weeklyLimit > 0 ? (
              Array.from({ length: weeklyLimit }, (_, i) => i + 1).map((week) => (
                <option key={week} value={week}>
                  Week {week}
                </option>
              ))
            ) : (
              <option value={0}>No weeks available</option>
            )}
          </select>
        </div>
        <span className="ms-3">
             {data ? `${total} hrs` : <Skeleton width={50} />}
        </span>

        <ResponsiveContainer width="100%" height={213}>
          {data ? (
            <BarChart data={data} margin={{ top: 30, right: 20, bottom: 0, left: 0 }}>
              <XAxis dataKey="day_name" tick={{ fontSize: 12 }} tickLine={false} />
              <Bar dataKey={(entry) => getHoursOrThreshold(entry)} barSize={34} radius={[8, 8, 8, 8]} >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                ))}
              </Bar>
              <ReferenceLine
                y={minThreshold}
                stroke="black"
                strokeDasharray="3 3"
                label={({ viewBox }) => (
                  <g transform={`translate(${viewBox.width - 320}, ${viewBox.y - 10})`}>
                    <rect width={60} height={20} fill="black" rx={5} />
                    <text x={30} y={12} fill="white" textAnchor="middle" dominantBaseline="middle">
                      {minThreshold} hours
                    </text>
                  </g>
                )}
              />
            </BarChart>
          ) : (
            <Skeleton height={200} />
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Activity;

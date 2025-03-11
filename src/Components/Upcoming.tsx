import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

interface Events {
  title: string;
  date: string;
  time: string;
}

interface Discussion {
  title: string; 
  week: string;
  date: string;
  time: string;
}

const Upcoming: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [events, setEvents] = useState<Events[]>([]);
  const [loadingDiscussions, setLoadingDiscussions] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/studentdashboard/upcomming/sessions/25MRITCS001/");
        setDiscussions(response.data.map((item: any) => ({
          title: item.title,
          week: item.title,
          date: item.date,
          time: item.time,
        })));
      } catch (error) {
        console.error("Error fetching discussions:", error);
      } finally {
        setLoadingDiscussions(false);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/studentdashboard/upcomming/events/Course1/");
        setEvents(response.data.map((event: any) => ({
          title: event.title,
          date: event.date,
          time: event.time,
        })));
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchDiscussions();
    fetchEvents();
  }, []);

  return (
    <div className="">
      <div
        className="row border bg-white rounded-2 mx-2 mb-2"
        style={{ minWidth: "35px", paddingBottom: "10px" }}
      >
        <p className="fw-light ps-4 pt-2" style={{ fontSize: "12px" }}>
          Upcoming live sessions
        </p>
        <div
          className="ps-4 bg-white pe-auto flex-end"
          style={{
            minWidth: "30px",
            height: "75px",
            overflowY: "auto",
            scrollbarWidth: "thin",
            fontSize: "11px",
          }}
        >
          {loadingDiscussions ? (
            <>
              <Skeleton height={10} width={100} />
              <Skeleton height={10} width={100} />
            </>
          ) : (
            discussions.map((item, index) => (
              <div key={index} className="p-0 m-0 mb-1 d-flex justify-content-between">
                <span>{item.week}</span>
                <span>{`${item.date} - ${item.time}`}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div
        className="row bg-white border rounded-2 mx-2"
        style={{ minWidth: "35px", paddingBottom: "10px" }}
      >
        <p className="fw-light ps-4 pt-2" style={{ fontSize: "12px" }}>
          Upcoming events
        </p>
        <div
          className="ps-4 pe-auto flex-end m-0 divDetails"
          style={{
            minWidth: "30px",
            height: "75px",
            overflowY: "auto",
            scrollbarWidth: "thin",
            fontSize: "11px",
          }}
        >
          {loadingEvents ? (
            <>
              <Skeleton height={10} width={100} />
              <Skeleton height={10} width={100} />
            </>
          ) : (
            events.map((event, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center  divDetails"
              >
                <span>{event.title}</span>
                <span>{`${event.date} - ${event.time}`}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;

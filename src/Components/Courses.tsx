import React, { useEffect, useState, useRef } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

interface Course {
  title: string;
  color: string;
  image: string;
  duration: string;
  progress: {
    student_progress: number;
    progress: number;
  };
  student_progress: number; 
}

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [scrollPosition, setScrollPosition] = useState({
    canScrollLeft: false,
    canScrollRight: false,
  });
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleCourseClick = (courseTitle: string) => {
    navigate("/roadmap", { state: { title: courseTitle } });
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/studentdashboard/mycourses/25MRITCS001/`
        );
  
        const colorMapping: { [key: string]: string } = {
          "HTML CSS": "#F9FEB5", 
          "Data Structures with C++ and Object-Oriented Programming with C++": "#B6FEB5", 
          "Data Structures and Algorithms": "#B6BAFE",
          "SQL": "#FFB5B5", 
        };
  
        const courseData = response.data.map((course: any) => ({
          ...course,
          color: colorMapping[course.title] || "#D3D3D3",
        }));
  
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  
    fetchCourses();
  }, []);
  

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setScrollPosition({
          canScrollLeft: scrollLeft > 0,
          canScrollRight: scrollLeft < scrollWidth - clientWidth - 1,
        });
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current && scrollPosition.canScrollLeft) {
      const container = scrollContainerRef.current;
      container.scrollBy({
        left: -container.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && scrollPosition.canScrollRight) {
      const container = scrollContainerRef.current;
      container.scrollBy({
        left: container.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="row rounded-2">
      <div className="d-flex justify-content-end" style={{ fontSize: "14px" }}>
        <div className=" text-dark">
          <FaArrowLeft
            onClick={scrollLeft}
            className={`arrow left ${
              !scrollPosition.canScrollLeft ? "disabled d-none" : "me-1"
            }`}
            style={{
              cursor: scrollPosition.canScrollLeft ? "pointer" : "not-allowed",
            }}
          />
          <FaArrowRight
            onClick={scrollRight}
            className={`arrow right ${
              !scrollPosition.canScrollRight ? "disabled d-none" : ""
            }`}
            style={{
              cursor: scrollPosition.canScrollRight ? "pointer" : "not-allowed",
            }}
          />
        </div>
      </div>
      <div
        className="course-container d-flex text-dark pb-3 flex-nowrap"
        ref={scrollContainerRef}
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          scrollbarWidth: "none",
          width: "100%",
        }}
      >
        {!courses.length ? (
          <div className="d-flex flex-nowrap justify-content-around">
            {[...Array(8)].map((_, i) => (
              <Skeleton
                key={i}
                height={160}
                width={250}
                style={{ maxWidth: "300px" }}
                containerClassName="me-3"
              />
            ))}
          </div>
        ) : (
          courses.map((course, index) => (
            <Card
              key={index}
              className="shadow mb-2"
              style={{
                width: "350px",
                height: "150px",
                minWidth: "350px",
                marginRight: index !== courses.length - 1 ? "1rem" : "0",
              }}
            >
              <Card.Body className="p-1 rounded-2">
                <div className="d-flex p-0">
                  <div className="d-flex flex-column align-items-center me-3">
                    <div
                      className="preview-image ms-2 mt-1 mb-2 border rounded-2"
                      style={{
                        width: "90px",
                        height: "130px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={course.image}
                        alt={`${course.title} Preview`}
                        className="img"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-column ">
                    <h6
                      className="p-1 mt-2 me-3"
                      style={{
                        backgroundColor: course.color,
                        color: "black",
                        borderRadius: "4px",
                        width: "200px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      title={course.title.length > 20 ? course.title : ""}
                    >
                      {course.title.length > 20
                        ? `${course.title.slice(0, 20)}...`
                        : course.title}
                      <FontAwesomeIcon
                        icon={faCircleRight}
                        onClick={() => handleCourseClick(course.title)}
                        style={{
                          color: "#009dff",
                          fontSize: "18px",
                          cursor: "pointer"
                        }}
                      />
                    </h6>
                    <span style={{ fontSize: "14px", color: "black" }}>
                      <span>
                        <FaClock className="mb-1" />
                        <span className="text-secondary ps-2">Duration</span>
                      </span>
                      <br />
                      <span>{course.duration}</span>
                      <ProgressBar
                        className="me-3"
                        style={{
                          flexGrow: 1,
                          marginTop : "30px",
                          height: "10px",
                          borderRadius: "4px",
                          borderColor: "#74C0FC",
                          backgroundColor: "#f0f0f0",
                        }}
                      >
                        <ProgressBar
                          striped
                          variant="success"
                          animated
                          now={course.progress.student_progress}
                          key={1}
                        />
                        <ProgressBar
                          // variant="secondary"
                          animated
                          now={course.progress.progress - course.progress.student_progress}
                          key={2}
                          style={{backgroundColor: "#d9dfe6"}}
                        />
                      </ProgressBar>
                      {course.progress.student_progress === 0 && (
                        <span className="d-flex justify-content-center align-items-center text-center" style={{fontSize:"12px"}}>
                          Not Started
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Courses;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MyLearning from "./images/MyLearning.png";
import Session from "./images/Session.png";
import Report from "./images/Report.png";
import Test from "./images/Test.png";
import Placement from "./images/Placement.png";
import Announcement from "./images/Announcement.png";
import Chat from "./images/Chat.png";
import ReportProblem from "./images/ReportProblem.png";
import Notification from "./images/Notification.png";
import RaiseTicket from "../RaiseTicket";
import Reports from "../Reports";
import Placements from "../Placement";

interface subMenu {
  label: string;
  path?: string;
  onClick?: () => void;
}

interface Menu {
  icon: string;
  label: string;
  path?: string;
  subMenu?: subMenu[];
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState<boolean>(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [showBugReport, setShowBugReport] = useState(false);

  const toggleSidebar = (): void => {
    setShow((prev) => !prev);
  };

  const toggleSubMenu = (menu: string) => {
    setOpenSubMenu((prev) => (prev === menu ? null : menu));
  };

  const handleReportBug = () => {
    setShowBugReport(true);
  };

  const sidebarItems: Menu[] = [
    { icon: MyLearning, label: "My Courses", path: "Dashboard" },
    { icon: Session, label: "Online Sessions", path: "online-session" },
    { icon: Report, label: "Reports", path: "Reports" },
    { icon: Test, label: "Tests", path: "test" },
    { icon: Placement, label: "Placement", path: "Placements" },
    { icon: Notification, label: "Notifications", path: "" },
    { icon: Announcement, label: "Announcement", path: "" },
    { icon: Chat, label: "Chat", path: "" },
    {
      icon: ReportProblem,
      label: "Report",
      subMenu: [
        { label: "Raise Ticket", onClick: handleReportBug },
        { label: "View Ticket", path: "report-problem" }
      ]
    },
  ];

  // Helper function to check if a menu item or submenu is active
  const isActive = (path: string) => location.pathname === `/${path}`;

  const isSubMenuActive = (subMenu: subMenu) => {
    return location.pathname === `/${subMenu.path}`;
  };

  return (
    <div
      className="d-flex flex-column bg-light shadow"
      style={{
        width: show ? "170px" : "60px",
        minHeight: "100vh",
        transition: "width 0.2s ease-in-out",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "1000",
        overflow: "hidden",
        borderRight: "1px solid #ccc",
      }}
    >
      <header
        className="d-flex"
        style={{ cursor: "pointer" }}
        onClick={toggleSidebar}
      >
        <span
          className="mb-0 fs-2 ps-2 fw-bolder text-start"
          style={{
            fontFamily: "Lucida Console",
          }}
        >
          EU
        </span>
      </header>

      <div
        className="mt-3"
        style={{
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        {sidebarItems.slice(0, 5).map((item, index) => (
          <div key={index}>
            <div
              className="d-flex align-items-center p-2 px-3 mb-1 hover-bg-primary"
              style={{
                cursor: "pointer",
                borderLeft: isActive(item.path || '') ? '4px solid black' : 'none',
                borderRadius: '4px',
              }}
              onClick={() => {
                navigate(`/${item.path}`);
              }}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="me-3"
                style={{
                  width: "25px",
                }}
              />
              <span className={show ? "d-block" : "d-none"}>{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="flex-grow-1"
        style={{
          cursor: "pointer",
        }}
        onClick={toggleSidebar}
      ></div>

      <div className="mt-auto" style={{ fontSize: "14px" }}>
        {sidebarItems.slice(5).map((item, index) => (
          <div key={index}>
            <div
              className="d-flex align-items-center p-2 px-3 mb-1 hover-bg-primary"
              style={{
                cursor: "pointer",
                borderLeft: item.subMenu && openSubMenu === item.label ? '4px solid black' : 'none',
                borderRadius: '4px',
              }}
              onClick={() => {
                if (item.subMenu) {
                  toggleSubMenu(item.label);
                } else if (item.path) {
                  navigate(`/${item.path}`);
                }
              }}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="me-1"
                style={{
                  width: "25px",
                }}
              />
              <span className={show ? "d-block" : "d-none"}>{item.label}</span>
            </div>

            {openSubMenu === item.label && item.subMenu && (
              <div>
                {item.subMenu.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className="d-flex align-items-center p-1 ps-4 mb-1 hover-bg-primary ms-3"
                    style={{
                      cursor: "pointer",
                      fontSize: "12px",
                      borderLeft: isSubMenuActive(subItem) ? '4px solid black' : 'none',
                      borderRadius: '4px',
                    }}
                    onClick={() => {
                      if (subItem.onClick) {
                        subItem.onClick();
                      } else if (subItem.path) {
                        navigate(`/${subItem.path}`);
                      }
                    }}
                  >
                    <span className={show ? "d-block" : "d-none"}>{subItem.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <RaiseTicket show={showBugReport} onHide={() => setShowBugReport(false)} />
    </div>
  );
};

export default Sidebar;

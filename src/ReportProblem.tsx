import React, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";
import { Spinner } from "react-bootstrap";
import DetailPanel from "./DetailPanel";
import Notification from "./Components/images/Notification.png";
import Back from "./Components/images/Back.png";
import User from "./Components/images/User.png";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";
// Define the Bug interface
interface Bug {
  sl_id: number;
  Student_id: string;
  Img_path: string;
  BugDescription: string;
  BugStatus: string;
  Issue_type: string;
  Reported: string;
  Resolved: string | null;
  Comments: Record<
    string,
    { role: string; comment: string; timestamp: string }
  >;
  studentname: string;
  student_id: string;
  email: string;
  mob_No: number;
  college: string;
  branch: string;
}

const demoBugs: Bug[] = [
  {
    sl_id: 220,
    Student_id: "24TEST0108",
    Img_path: "image/path",
    BugDescription: "bgnmb",
    BugStatus: "Pending",
    Issue_type: "UI Related Topics",
    Reported: "2025-01-21T07:05:10.852Z",
    Resolved: null,
    Comments: {},
    studentname: "Ranjitha A N",
    student_id: "24TEST0108",
    email: "ranjitha.an.82@gmail.com",
    mob_No: 1,
    college: "TPS",
    branch: "tps",
  },
  {
    sl_id: 209,
    Student_id: "24TEST0108",
    Img_path: "imgpath",
    BugDescription: "testing",
    BugStatus: "Resolved",
    Issue_type: "UI Related Topics",
    Reported: "2024-11-27T04:10:27.886Z",
    Resolved: "2024-11-27T04:12:00.773Z",
    Comments: {
      stu1: {
        role: "student",
        comment: "gfcgffdgcgcffgcgcfgcf",
        timestamp: "2024-11-27 09:40:43",
      },
      tra1: {
        role: "trainer",
        comment: "asdasdsadasd",
        timestamp: "2024-11-27 09:41:58",
      },
      tra2: {
        role: "trainer",
        comment: "46546546546546",
        timestamp: "2024-11-27 10:29:27",
      },
    },
    studentname: "Ranjitha A N",
    student_id: "24TEST0108",
    email: "ranjitha.an.82@gmail.com",
    mob_No: 1,
    college: "TPS",
    branch: "tps",
  },
];

const ReportProblem: React.FC = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setBugs(demoBugs);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "sl_id",
        header: "Ticket Number",
      },
      {
        accessorKey: "Issue_type",
        header: "Support Type",
      },
      {
        accessorKey: "Reported",
        header: "Reported Date",
        Cell: ({ cell }: { cell: { getValue: () => string } }) =>
          new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: "Resolved",
        header: "Responded Date",
        Cell: ({ cell }: { cell: { getValue: () => string | null } }) =>
          cell.getValue() ? new Date().toLocaleDateString() : "Not resolved",
      },
      {
        accessorKey: "BugStatus",
        header: "Status",
        Cell: ({ cell }: { cell: { getValue: () => string } }) => (
          <Box
            component="span"
            sx={{
              color: cell.getValue() === "Pending" ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            {cell.getValue()}
          </Box>
        ),
      },
    ],
    []
  );

  const table = {
    columns,
    data: bugs,
    enableExpanding: true,
    renderDetailPanel: ({ row }: { row: any }) => (
      <DetailPanel row={row} onCommentAdded={() => {}} />
    ),
  };

  return (
    <div style={{ backgroundColor: "#F2EEEE", minHeight: "100vh" }}>
      <Sidebar />
      <div
        className="p-0 my-0 me-2"
        style={{ backgroundColor: "#F2EEEE", marginLeft: "70px" }}
      >
        <Header/>
        <div className="container-fluid p-0 px-3 mt-3 pt-3 pb-4 " style={{maxWidth: "100%", minHeight: "calc(100vh - 100px)", height:"calc(100vh - 100px)", overflowX: "hidden", overflowY: "auto", backgroundColor: "white"}}>
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
            >
              <Spinner animation="border" style={{ color: "#3F51B5" }} />{" "}
              Loading...
            </div>
          ) : (
            <Box
            >
              <MaterialReactTable {...table} />
            </Box>
          )}
        </div>
      </div>
            <div style={{cursor: "pointer"}}>
        <Footer />
      </div>
    </div>
  );
};

export default ReportProblem;

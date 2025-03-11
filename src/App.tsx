import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Detector } from "react-detect-offline";
import { FaExclamationTriangle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-loading-skeleton/dist/skeleton.css';
import "./App.css";

function App() {
  return (
    <Detector
      render={({ online }) =>
        online ? (
          <Router>
            <AppRoutes />
          </Router>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-danger">
            <FaExclamationTriangle size={50} className="mb-3 blink" />
            <h1 className="fw-bold">No Internet</h1>
            <h4>Please check your internet connection</h4>
          </div>
        )
      }
    />
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import html2canvas from "html2canvas";

interface RaiseTicketProps {
  show: boolean;
  onHide: () => void;
}

const RaiseTicket: React.FC<RaiseTicketProps> = ({ show, onHide }) => {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [bugDesc, setBugDesc] = useState("");
  const [issueType, setIssueType] = useState("");
  const [loading, setLoading] = useState(false);

  const issueTypes = [
    "UI Related Topics",
    "Functionality Related Topics",
    "Performance Related Topics",
    "Security Vulnerability Related Topics",
    "Other Related Topics",
    "Require Tutor Assistance",
  ];

  useEffect(() => {
    if (show) {
      handleReportBug();
    }
  }, [show]);

  const handleReportBug = async () => {
    try {
      const options = {
        scale: 2, // Increase quality
        useCORS: true, // Enable CORS for images
        logging: false, // Disable logging
        foreignObjectRendering: true, // Enable better text rendering
        removeContainer: true, // Clean up temporary elements
        
        // allowTaint: false,
        // imageTimeout: 0, // Disable timeout for images
        // scrollX: 0,
        // scrollY: 0,
        // windowWidth: document.documentElement.clientWidth,
        // windowHeight: document.documentElement.clientHeight,
        // Ignore elements that might cause issues
        ignoreElements: (element: Element) => {
          const ignore = element.classList.contains('modal') || 
                        element.classList.contains('modal-backdrop');
          return ignore;
        }
      };

      const canvas = await html2canvas(document.body, options);
      const screenshot = canvas.toDataURL("image/png", 2.0); // Max quality
      setScreenshot(screenshot);
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  };

  const handleBugSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onHide();
      setBugDesc("");
      setIssueType("");
      setScreenshot(null);
    }, 2000);
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="lg" 
      centered
      contentClassName="border-0"
    >
      <div className="d-flex justify-content-end p-2">
        <button 
          onClick={onHide}
          className="btn-close"
          aria-label="Close"
        />
      </div>
      <Modal.Body className="p-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-2">
                <span className="text-dark">Screenshots</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  maxHeight: "300px",
                  overflowY: "auto",
                  borderRadius: "8px"
                }}
              >
                {screenshot && (
                  <img
                    src={screenshot}
                    alt="Screenshot"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                )}
              </div>
            </div>

            <div className="col-md-6">
              <form onSubmit={handleBugSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-medium">Support Type</label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    required
                    className="form-select"
                    style={{ backgroundColor: '#fff' }}
                  >
                    <option value="">Select</option>
                    {issueTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-medium">Description</label>
                  <textarea
                    className="form-control"
                    value={bugDesc}
                    onChange={(e) => setBugDesc(e.target.value)}
                    rows={4}
                    required
                    style={{ backgroundColor: '#fff' }}
                  />
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={loading}
                    style={{ backgroundColor: "#0d6efd", borderColor: "#0d6efd" }}
                  >
                    {loading ? "Submitting..." : "Raise Ticket"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RaiseTicket;
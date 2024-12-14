import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./style.css";

const Reset = ({ show, onHide }) => {
  const navigate = useNavigate(); // For redirection
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  // State for managing password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleReset = async () => {
    setError(""); // Clear any previous error
    const { currentPassword, newPassword, confirmPassword } = formData;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setIsSubmitting(true); // Disable button during request
    try {
      const response = await fetch("http://localhost:3001/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        alert(
          "Password reset successful. Please log in with your new password."
        );
        onHide(); // Close the modal
        navigate("/login"); // Redirect to login page
      } else {
        setError(data.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); // Re-enable button after request
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="modal-title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="modal-title">Reset Your Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <div className="input-container">
              <Form.Control
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                required
              />
              <div
                className="input-icon"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <div className="input-container">
              <Form.Control
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
              />
              <div
                className="input-icon"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <div className="input-container">
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <div
                className="input-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleReset}
          disabled={isSubmitting}
          style={{
            width: "100%",
            color: "white",
            backgroundColor: "#e9570a",
            border: "none",
            fontWeight: "600",
          }}
        >
          {isSubmitting ? "Resetting..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Reset;

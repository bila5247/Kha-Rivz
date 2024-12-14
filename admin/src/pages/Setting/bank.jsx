import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { Modal, Form } from "react-bootstrap";
import "./style.css";

const bank = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    branchName: "",
    swiftCode: "",
    accountHolderName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Bank Data:", formData);
    setShowModal(false); // Close the modal after submission
    // Add further logic to handle the data (e.g., API call)
  };

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div
            className="cate d-flex align-items-center"
            style={{ justifyContent: "space-between" }}
          >
            <h1>Banks</h1>
            <Button
              onClick={() => setShowModal(true)}
              style={{
                color: "white",
                backgroundColor: "#e9570a",
                border: "none",
                fontWeight: "600",
              }}
            >
              Add New Bank
            </Button>
          </div>
          <table className="table table-bordered table-hover">
            <thead className="table-header">
              <tr>
                <th>Bank Name</th>
                <th>Account Title</th>
                <th>Account Number</th>
                <th>Opening Balance</th>
                <th>Account Type</th>
                <th>Default Business Account</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tr>
              <td>bank 1</td>
              <td>Khawaja</td>
              <td>2345678765</td>
              <td>----</td>
              <td>Buisness</td>
              <td>Yes</td>
              <td className="d-flex gap-2 align-items-center">
                <button
                  size="lg"
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: 0,
                  }}
                >
                  <FaEdit size={18} />
                </button>
                <button
                  size="lg"
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: 0,
                  }}
                >
                  <MdDelete size={18} />
                </button>
                <button
                  size="lg"
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: 0,
                  }}
                >
                  <FaMapLocationDot size={18} />
                </button>
              </td>
            </tr>
          </table>
          {/* Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Bank</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBankName">
                  <Form.Label>Select Bank</Form.Label>
                  <Form.Select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a Bank</option>
                    <option value="Habib Bank Limited">
                      Habib Bank Limited (HBL)
                    </option>
                    <option value="United Bank Limited">
                      United Bank Limited (UBL)
                    </option>
                    <option value="National Bank of Pakistan">
                      National Bank of Pakistan (NBP)
                    </option>
                    <option value="MCB Bank Limited">MCB Bank Limited</option>
                    <option value="Allied Bank Limited">
                      Allied Bank Limited
                    </option>
                    <option value="Bank Alfalah">Bank Alfalah</option>
                    <option value="Standard Chartered Bank">
                      Standard Chartered Bank
                    </option>
                    <option value="Meezan Bank">Meezan Bank</option>
                    <option value="Faysal Bank">Faysal Bank</option>
                    <option value="Bank of Punjab">Bank of Punjab</option>
                    <option value="Silk Bank">Silk Bank</option>
                    <option value="Askari Bank">Askari Bank</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formBankName">
                  <Form.Label>Opening Balance</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Write Opening Balance"
                    name="bankName"
                    value={formData.openingBalance}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formAccountType">
                  <Form.Label>Account Type</Form.Label>
                  <Form.Select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Account Type</option>
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                    <option value="Business">Business</option>
                    <option value="Joint">Joint</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formAccountHolderName">
                  <Form.Label>Account Holder Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter account holder's name"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formAccountNumber">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter account number"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3"
                  style={{
                    width: "100%",
                    color: "white",
                    backgroundColor: "#e9570a",
                    border: "none",
                    fontWeight: "600",
                  }}
                >
                  Save
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default bank;

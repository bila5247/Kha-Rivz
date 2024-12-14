import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(""); // Add state for password
  const [type, setType] = useState("admin");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createStaff", { name, email, address, phone, type, password }) // Include password
      .then((result) => {
        alert("User Created Successfully");
        window.location.href = "/User";
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrors(error.response.data.errors);
        } else {
          alert("An error occurred while creating the user");
        }
      });
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div
          className="d-flex vh-100 justify-content-center align-items-center"
          style={{ backgroundColor: "#F9F9F6" }}
        >
          <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleSubmit}>
              <h2>Add User</h2>
              <div className="mb-2">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter User Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-danger">{errors.name}</p>}
              </div>
              <div className="mb-2">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter User Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>
              <div className="mb-2">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Enter User Address"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && <p className="text-danger">{errors.address}</p>}
              </div>
              <div className="mb-2">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Enter User Phone"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p className="text-danger">{errors.phone}</p>}
              </div>
              <div className="mb-2">
                <label>Password</label> {/* Add password field */}
                <input
                  type="password"
                  placeholder="Enter User Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-danger">{errors.password}</p>}
              </div>
              <div className="mb-2">
                <label>Type</label>
                <select
                  className="p-1 ms-3 form-control"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="shopkeeper">Shopkeeper</option>
                </select>
                {errors.type && <p className="text-danger">{errors.type}</p>}
              </div>
              <div className="mt-2">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button type="reset" className="btn btn-secondary ml-2">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
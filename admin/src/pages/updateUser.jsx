import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("admin");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/getStaff/${id}`)
      .then(result => {
        const user = result.data;
        setName(user.name);
        setEmail(user.email);
        setAddress(user.address);
        setPhone(user.phone);
        setType(user.type); // Set the initial type value
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/updateStaff/${id}`, { name, email, address, phone, type })
      .then(() => {
        alert("User updated successfully");
        navigate('/User'); // Redirect to the user list page
      })
      .catch(err => {
        console.error('Error updating user:', err.response ? err.response.data : err.message);
        if (err.response && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: "#F9F9F6" }}>
          <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleSubmit}>
              <h2>Update User</h2>
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
                <label>Type</label>
                <select
                  className="form-control"
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
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn btn-secondary ml-2" onClick={() => navigate('/User')}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
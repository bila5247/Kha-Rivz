import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/staffs")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleStatusChange = (index) => {
    const newStatus = users[index].status === "Active" ? "Inactive" : "Active";
    const updatedDate = new Date().toISOString().split("T")[0];

    axios
      .put(`http://localhost:3001/staffs/${users[index]._id}`, {
        status: newStatus,
        date: updatedDate,
      })
      .then((response) => {
        console.log("Response from backend:", response.data);
        setUsers((prevUsers) => {
          const newUsers = [...prevUsers];
          newUsers[index].status = newStatus;
          newUsers[index].date = updatedDate;
          return newUsers;
        });
      })
      .catch((err) => {
        console.error(
          "Error updating status:",
          err.response ? err.response.data : err.message
        );
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:3001/staffs/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user._id !== id));
          alert("User deleted successfully");
        })
        .catch((err) => {
          console.error(
            "Error deleting user:",
            err.response ? err.response.data : err.message
          );
          alert("Failed to delete user");
        });
    }
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div
          className="d-flex vh-100 justify-content-center"
          style={{ backgroundColor: "#F9F9F6" }}
        >
          <div className="w-100 bg-white rounded p-3">
            <Link to="/create-user" className="btn btn-success">
              Add User
            </Link>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Address</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>{user.type}</td>
                    <td>{user.status}</td>
                    <td>
                      <button onClick={() => handleStatusChange(index)}>
                        {user.status === "Active"
                          ? "Set Inactive"
                          : "Set Active"}
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/update-user/${user._id}`}
                        className="btn btn-success"
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

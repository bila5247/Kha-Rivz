import React, { useState } from "react";
import Footer from "../Component/Footer";
import { Link } from "react-router-dom";

const Login = () => {
  const [uemail, setUemail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(uemail, password);
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: uemail,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userLogin");
        if (data.status === "ok") {
          alert("Sign in successfully");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "/admin";
        } else {
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  const handleSignup = () => {
    window.localStorage.clear();
    window.location.href = "./register";
  };

  return (
    <>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay" />
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <div className="container">
            <div className="col-lg-6 rivform" style={{ width: "40%" }}>
              <div className="p-lg-5 p-4">
                <div>
                  <h5 className="rivwel">Welcome Back!</h5>
                  <p className="text-muted">Sign in to continue to Rivozah.</p>
                </div>
                <div className="mt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="useremail"
                        placeholder="Email Address"
                        value={uemail}
                        onChange={(e) => setUemail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <div className="position-relative auth-pass-inputgroup mb-3">
                        <input
                          type="password"
                          className="form-control pe-5 password-input"
                          placeholder="Password"
                          id="password-input"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <div className="float-start rivfor">
                          <Link
                            to="auth-pass-reset-cover.html"
                            className="rivforg"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        className="btn riv w-100"
                        type="submit"
                        style={{
                          color: "white",
                          backgroundColor: "#e9570a",
                          border: "none",
                          fontWeight: "600",
                        }}
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={handleSignup}
                        className="btn riv w-100"
                        type="button"
                        style={{
                          color: "white",
                          backgroundColor: "#e9570a",
                          border: "none",
                          fontWeight: "600",
                        }}
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;

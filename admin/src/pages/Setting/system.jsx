import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Typography } from "@mui/material";
import "./style.css";

// Custom TabPanel Component
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

// Main Component
export default function ProfileTabs() {
  const [value, setValue] = React.useState(0);

  // Function to handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // User profile data
  const user = {
    profilePicture: "https://via.placeholder.com/150", // Replace with actual image URL
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+92-300-1234567",
    address: "123 Main St, Karachi, Pakistan",
  };

  // Accessibility props for the tabs
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="profile tabs"
              >
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="Social Links" {...a11yProps(1)} />
                {/* <Tab label="Activity" {...a11yProps(2)} /> */}
              </Tabs>
            </Box>

            {/* Profile Tab Panel */}
            <CustomTabPanel value={value} index={0}>
              <Box display="flex" alignItems="center" flexDirection="column">
                <div className="container">
                  <div className="main-body">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                              <img
                                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                alt="Admin"
                                className="rounded-circle p-1 bg-primary"
                                width={110}
                              />
                              <div className="mt-3">
                                <h4>John Doe</h4>
                                <p className="text-secondary mb-1">
                                  Full Stack Developer
                                </p>
                                <p className="text-muted font-size-sm">
                                  Bay Area, San Francisco, CA
                                </p>
                                <div className="follow">
                                  <button
                                    className="btn btn-primary"
                                    style={{
                                      color: "white",
                                      backgroundColor: "#e9570a",
                                      border: "none",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Follow
                                  </button>
                                  <button
                                    className="btn btn-outline-primary"
                                    style={{
                                      color: "white",
                                      backgroundColor: "#e9570a",
                                      border: "none",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Message
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="card">
                          <div className="card-body">
                            <div className="row mb-3">
                              <div className="col-sm-3">
                                <h6 className="mb-0">Full Name</h6>
                              </div>
                              <div className="col-sm-9 text-secondary">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="John Doe"
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-3">
                                <h6 className="mb-0">Email</h6>
                              </div>
                              <div className="col-sm-9 text-secondary">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="john@example.com"
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-3">
                                <h6 className="mb-0">Phone</h6>
                              </div>
                              <div className="col-sm-9 text-secondary">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="(239) 816-9029"
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-3">
                                <h6 className="mb-0">Mobile</h6>
                              </div>
                              <div className="col-sm-9 text-secondary">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="(320) 380-4539"
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-3">
                                <h6 className="mb-0">Address</h6>
                              </div>
                              <div className="col-sm-9 text-secondary">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Bay Area, San Francisco, CA"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-3" />
                              <div className="col-sm-9 text-secondary">
                                <input
                                  type="button"
                                  className="btn btn-primary px-4"
                                  defaultValue="Save Changes"
                                  style={{
                                    color: "white",
                                    backgroundColor: "#e9570a",
                                    border: "none",
                                    fontWeight: "600",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </CustomTabPanel>

            {/* Settings Tab Panel */}
            <CustomTabPanel value={value} index={1}>
              {/* Add content for Settings */}

              <Typography variant="body1">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-globe me-2 icon-inline"
                      >
                        <circle cx={12} cy={12} r={10} />
                        <line x1={2} y1={12} x2={22} y2={12} />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      Website
                    </h6>
                    <span className="text-secondary">https://bootdey.com</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-github me-2 icon-inline"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      Github
                    </h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-twitter me-2 icon-inline text-info"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                      Twitter
                    </h6>
                    <span className="text-secondary">@bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-instagram me-2 icon-inline text-danger"
                      >
                        <rect
                          x={2}
                          y={2}
                          width={20}
                          height={20}
                          rx={5}
                          ry={5}
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      Instagram
                    </h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-facebook me-2 icon-inline text-primary"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      Facebook
                    </h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                </ul>
              </Typography>
            </CustomTabPanel>

            {/* Activity Tab Panel */}
            {/* <CustomTabPanel value={value} index={2}>
              {/* Add content for Activity *
              <Typography variant="h6">User Activity</Typography>
              <Typography variant="body1">
                Activity Content Goes Here
              </Typography>
            </CustomTabPanel> */}
          </Box>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Khawaja.png";
import MyVerticallyCenteredModal from "../pages/modal";
import Reset from "../pages/Setting/reset";

const Sidebar = () => {
  const [userData, setUserData] = useState({});
  const [modalShow, setModalShow] = useState(false); // State to manage the Add Product modal visibility
  const [resetModalShow, setResetModalShow] = useState(false); // State to manage the Reset modal visibility

  useEffect(() => {
    fetch("http://localhost:3001/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "admin");
        if (data.status === "ok") {
          setUserData(data.data || {}); // Ensure `data.data` is an object
        } else {
          console.error("Failed to fetch user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Function to handle opening the Add Product modal
  const handleAddProductClick = () => {
    setModalShow(true);
  };

  // Function to open the Reset modal
  const handleResetClick = (event) => {
    event.preventDefault(); // Prevent navigation on click
    setResetModalShow(true);
  };

  // Function to close the Reset modal
  const closeResetModal = () => {
    setResetModalShow(false);
  };

  return (
    <>
      <div className="app-menu navbar-menu side">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={Logo} alt height={22} />
            </span>
            <span className="logo-lg">
              <img src={Logo} alt height={17} />
            </span>
          </Link>
          <Link to="index.html" className="logo logo-light">
            <span className="logo-sm">
              <img src={Logo} alt height={22} />
            </span>
            <span className="logo-lg">
              <img src={Logo} alt height={40} />
            </span>
          </Link>
          <Link
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line" />
          </Link>
        </div>
        <div id="scrollbar">
          <div className="container-fluid">
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title"></li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/admin"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarDashboards"
                >
                  <i className="ri-dashboard-2-line" />{" "}
                  <span data-key="t-dashboards">Dashboards</span>
                </Link>
                <div
                  className="collapse menu-dropdown"
                  id="sidebarDashboards"
                ></div>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="#sidebarApps"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarApps"
                >
                  <i className="ri-apps-2-line" />{" "}
                  <span data-key="t-apps">Products</span>
                </Link>
                <div className="collapse menu-dropdown" id="sidebarApps">
                  <ul className="nav nav-sm flex-column">
                    <Link
                      to=""
                      className="nav-link"
                      data-key="t-add-product"
                      variant="primary"
                      onClick={handleAddProductClick}
                    >
                      Add Product
                    </Link>
                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    <li className="nav-item">
                      <Link
                        to="/products"
                        className="nav-link"
                        data-key="t-chat"
                      >
                        {" "}
                        All Products{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/category"
                        className="nav-link"
                        data-key="t-ecommerce"
                      >
                        Categories
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="#sidebarForms"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarForms"
                >
                  <i className="ri-file-list-3-line" />{" "}
                  <span data-key="t-forms">Setting</span>
                </Link>
                <div className="collapse menu-dropdown" id="sidebarForms">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to=""
                        className="nav-link"
                        data-key="t-basic-elements"
                        onClick={handleResetClick}
                      >
                        Reset Password
                      </Link>
                      <Reset show={resetModalShow} onHide={closeResetModal} />
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/location"
                        className="nav-link"
                        data-key="t-form-select"
                      >
                        Location
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/bank"
                        className="nav-link"
                        data-key="t-form-select"
                      >
                        Banks
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/system"
                        className="nav-link"
                        data-key="t-form-select"
                      >
                        System Settings
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebar-background" />
      </div>
    </>
  );
};

export default Sidebar;

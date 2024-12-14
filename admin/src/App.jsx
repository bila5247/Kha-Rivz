import React, { useState } from "react";
import "./App.css";
import Home from "./Component/Home";
import Layout from "./Component/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Media from "./pages/media";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./Component/User";
import CreateUser from "./pages/createUser";
import UpdateUser from "./pages/updateUser";
import MyVerticallyCenteredModal from "./pages/modal"; // Import the Modal
import Product from "./pages/products";
import Category from "./pages/category/category";
import Login from "./pages/login";
import Reset from "./pages/Setting/reset";
import Location from "./pages/Setting/location";
import Bank from "./pages/Setting/bank";
import System from "./pages/Setting/system";

function App() {
  const [modalShow, setModalShow] = useState(false); // Modal state

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Home />} />
          <Route
            path="/Media"
            element={
              <Layout>
                <Media />
              </Layout>
            }
          />
          <Route
            path="/add-product"
            element={
              <Layout>
                <div>
                  {/* Trigger modal */}
                  <button
                    className="btn btn-primary"
                    onClick={() => setModalShow(true)}
                  >
                    Add Product
                  </button>

                  {/* Add Product Modal */}
                  <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)} // Close modal
                  />
                </div>
              </Layout>
            }
          />
          <Route
            path="/User"
            element={
              <Layout>
                <User />
              </Layout>
            }
          />
          <Route
            path="/create-User"
            element={
              <Layout>
                <CreateUser />
              </Layout>
            }
          />
          <Route
            path="/category"
            element={
              <Layout>
                <Category />
              </Layout>
            }
          />
          <Route
            path="/products"
            element={
              <Layout>
                <Product />
              </Layout>
            }
          />
          <Route
            path="/update-user/:id"
            element={
              <Layout>
                <UpdateUser />
              </Layout>
            }
          />
          <Route
            path="/reset"
            element={
              <Layout>
                <Reset />
              </Layout>
            }
          />
          <Route
            path="/location"
            element={
              <Layout>
                <Location />
              </Layout>
            }
          />
          <Route
            path="/bank"
            element={
              <Layout>
                <Bank />
              </Layout>
            }
          />
          <Route
            path="/system"
            element={
              <Layout>
                <System />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

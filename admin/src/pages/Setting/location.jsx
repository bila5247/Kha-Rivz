import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { Modal, Form } from "react-bootstrap";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./style.css";

const libraries = ["places"]; // Load additional libraries if needed
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: 31.5204, // Default latitude (Lahore, Pakistan)
  lng: 74.3587, // Default longitude
};

const Location = () => {
  const [showModal, setShowModal] = useState(false);
  const [cities, setCities] = useState([]); // To store the cities based on selected province
  const [selectedLocation, setSelectedLocation] = useState(center);
  const [formData, setFormData] = useState({
    name: "",
    province: "",
    city: "",
    address: "",
    days: "",
    phone: "",
    alternative: "",
    invoice: "",
    // location:"" , // Store latitude and longitude,
  });
  // const [mapCenter, setMapCenter] = useState({ lat: 31.5204, lng: 74.3587 }); // Default center (Lahore)
  // const [markerPosition, setMarkerPosition] = useState(mapCenter);

  // // const handleMapClick = (e) => {
  //   const lat = e.latLng.lat();
  //   const lng = e.latLng.lng();
  //   setMarkerPosition({ lat, lng });
  //   setFormData({ ...formData, location: { lat, lng } });
  // };
  const [editData, setEditData] = useState(null);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the cities list when a province is selected
    if (name === "province") {
      setCities(provincesWithCities[value] || []); // Update cities based on province
      setFormData({ ...formData, province: value, city: "" }); // Reset city when province changes
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Function to open modal with data
  const handleEdit = (data) => {
    setEditData(data);
    setFormData(data); // Populate form with existing data
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowModal(false); // Close modal after form submission
  };
  const provincesWithCities = {
    Punjab: ["Lahore", "Multan", "Faisalabad", "Rawalpindi"],
    Sindh: ["Karachi", "Hyderabad", "Sukkur"],
    Balochistan: ["Quetta", "Gwadar", "Turbat"],
    KPK: ["Peshawar", "Abbottabad", "Swat"],
  };

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div
            className="cate d-flex align-items-center"
            style={{ justifyContent: "space-between" }}
          >
            <h1>Location</h1>
            <Button
              onClick={() => setShowModal(true)}
              style={{
                color: "white",
                backgroundColor: "#e9570a",
                border: "none",
                fontWeight: "600",
              }}
            >
              Add Location
            </Button>
          </div>
          <table className="table table-bordered table-hover">
            <thead className="table-header">
              <tr>
                <th>Location Name</th>
                <th className="w-50">Address</th>
                <th>Province Name</th>
                <th>City Name</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Location 1</td>
                <td>Crystal Arcade</td>
                <td>Punjab</td>
                <td>Multan</td>
                <td>2021-01-01 10:00:00</td>
                <td>
                  <button
                    style={{
                      border: "none",
                      background: "transparent",
                      padding: 0,
                    }}
                    onClick={() =>
                      handleEdit({
                        name: "Location 1",
                        address: "Crystal Arcade",
                        province: "Punjab",
                        city: "Multan",
                        days: "Monday-Friday",
                        phone: "1234567890",
                        alternative: "0987654321",
                        invoice: "Yes",
                        location: "Central",
                      })
                    }
                  >
                    <FaEdit size={18} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>
                {formData.name ? "Edit Location" : "Add Location"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name of Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formProvince">
                  <Form.Label>Province</Form.Label>
                  <Form.Control
                    as="select"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Province</option>
                    {Object.keys(provincesWithCities).map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as="select"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!formData.province} // Disable if no province is selected
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formAddress">
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter street address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDays">
                  <Form.Label>Shopping Opening Days</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter days"
                    name="days"
                    value={formData.days}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter contact number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formAlternative">
                  <Form.Label>Alternative Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter alternative number"
                    name="alternative"
                    value={formData.alternative}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formInvoice">
                  <Form.Label>Show Contact Number on Invoice</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Yes/No"
                    name="invoice"
                    value={formData.invoice}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                {/* Google Map Integration
                <Form.Group controlId="formMap">
                  <Form.Label>Choose Location</Form.Label>
                  <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap
                      mapContainerStyle={{
                        height: "400px",
                        width: "100%",
                      }}
                      center={mapCenter}
                      zoom={12}
                      onClick={handleMapClick}
                    >
                      <Marker position={markerPosition} />
                    </GoogleMap>
                  </LoadScript>
                  <Form.Text>
                    Click on the map to select the location. Selected
                    coordinates:
                    <strong>
                      {markerPosition.lat}, {markerPosition.lng}
                    </strong>
                  </Form.Text>
                </Form.Group> */}

                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    color: "white",
                    backgroundColor: "#e9570a",
                    border: "none",
                    fontWeight: "600",
                  }}
                >
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Location;

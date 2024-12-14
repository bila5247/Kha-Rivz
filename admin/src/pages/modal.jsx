import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function MyVerticallyCenteredModal({ show, onHide, onProductAdd }) {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    location: "",
    condition: "new",
    quantity: 0,
    costPrice: 0,
    salePrice: 0,
    thumbnail: null,
    sku: "", // New SKU field
  });

  const [categories, setCategories] = useState([]);

  // Fetch categories when the modal is displayed
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data); // Assuming the response contains a list of categories
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (show) {
      fetchCategories();
    }
  }, [show]); // Only fetch categories when modal is shown

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setFormData((prev) => ({ ...prev, thumbnail: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "thumbnail" && formData.thumbnail) {
        payload.append(key, formData.thumbnail);
      } else {
        payload.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        body: payload,
      });

      if (response.ok) {
        const newProduct = await response.json();
        if (onProductAdd) onProductAdd(newProduct); // Pass the new product to the parent
        alert("Product added successfully!");
        setFormData({
          category: "",
          title: "",
          location: "",
          condition: "new",
          quantity: 0,
          costPrice: 0,
          salePrice: 0,
          thumbnail: null,
          sku: "", // Reset SKU field
        });
        onHide(); // Close modal
      } else {
        const errorText = await response.text();
        alert("Failed to add product: " + errorText);
      }
    } catch (error) {
      alert("An error occurred while adding the product.");
      console.error(error);
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
        <Modal.Title id="modal-title">Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Category */}
          <Form.Group controlId="formCategory" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name} {/* Assuming category has 'name' and '_id' properties */}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Title */}
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Location */}
          <Form.Group controlId="formLocation" className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Condition */}
          <Form.Group controlId="formCondition" className="mb-3">
            <Form.Label>Condition</Form.Label>
            <Form.Control
              as="select"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="new">New</option>
              <option value="refurbished">Refurbished</option>
              <option value="used">Used</option>
            </Form.Control>
          </Form.Group>

          {/* Quantity */}
          <Form.Group controlId="formQuantity" className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Cost Price */}
          <Form.Group controlId="formCostPrice" className="mb-3">
            <Form.Label>Cost Price</Form.Label>
            <Form.Control
              type="number"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Sale Price */}
          <Form.Group controlId="formSalePrice" className="mb-3">
            <Form.Label>Sale Price</Form.Label>
            <Form.Control
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* SKU */}
          <Form.Group controlId="formSku" className="mb-3">
            <Form.Label>SKU (Product Barcode)</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Thumbnail */}
          <Form.Group controlId="formThumbnail" className="mb-3">
            <Form.Label>Thumbnail</Form.Label>
            <Form.Control
              type="file"
              name="thumbnail"
              onChange={handleChange}
              accept="image/*"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;

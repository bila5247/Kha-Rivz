import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EditProductModal = ({ show, onHide, product, onSave }) => {
  const [formData, setFormData] = useState({
    title: product.title || "",
    category: product.category || "",
    location: product.location || "",
    condition: product.condition || "",
    quantity: product.quantity || "",
    costPrice: product.costPrice || "",
    salePrice: product.salePrice || "",
    sku: product.sku || "",
    thumbnail: null, // For file input
  });
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    // Update the form data when the product prop changes
    if (product) {
      setFormData({
        title: product.title || "",
        category: product.category || "",
        location: product.location || "",
        condition: product.condition || "",
        quantity: product.quantity || "",
        costPrice: product.costPrice || "",
        salePrice: product.salePrice || "",
        sku: product.sku || "",
        thumbnail: null, // Reset the thumbnail when opening the modal
      });
    }
  }, [product]);

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, thumbnail: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("category", formData.category);
    formDataObj.append("location", formData.location);
    formDataObj.append("condition", formData.condition);
    formDataObj.append("quantity", formData.quantity);
    formDataObj.append("costPrice", formData.costPrice);
    formDataObj.append("salePrice", formData.salePrice);
    formDataObj.append("sku", formData.sku);

    if (formData.thumbnail) {
      formDataObj.append("thumbnail", formData.thumbnail);
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/products/${product._id}`,
        {
          method: "PUT",
          body: formDataObj,
        }
      );

      if (response.ok) {
        const updatedProduct = await response.json();
        onSave(updatedProduct); // Update UI with the new product data
        onHide(); // Close the modal
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

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
                  {category.name}{" "}
                  {/* Assuming category has 'name' and '_id' properties */}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formLocation" className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formCondition" className="mb-3">
            <Form.Label>Condition</Form.Label>
            <Form.Control
              as="select"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            >
              <option value="new">New</option>
              <option value="refurbished">Refurbished</option>
              <option value="used">Used</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formQuantity" className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formCostPrice" className="mb-3">
            <Form.Label>Cost Price</Form.Label>
            <Form.Control
              type="number"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formSalePrice" className="mb-3">
            <Form.Label>Sale Price</Form.Label>
            <Form.Control
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formSku" className="mb-3">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formThumbnail" className="mb-3">
            <Form.Label>Thumbnail</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </Form.Group>

          {formData.thumbnail && (
            <div>
              <img
                src={
                  typeof formData.thumbnail === "string"
                    ? `http://localhost:3001/${formData.thumbnail}`
                    : URL.createObjectURL(formData.thumbnail)
                }
                alt="Preview"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;

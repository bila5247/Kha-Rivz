import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    description: "",
  });

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/categories");
        const data = await response.json();

        console.log(data); // Log the response to check if it's an array

        if (Array.isArray(data)) {
          setCategories(data); // If data is an array, set it to the state
        } else {
          console.error("Expected an array, but got:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  // Handle form data changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle the form submission to add category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("image", formData.image);
    formDataToSubmit.append("description", formData.description);

    try {
      const response = await fetch("http://localhost:3001/api/categories", {
        method: "POST",
        body: formDataToSubmit,
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories((prev) => [...prev, newCategory]); // Add to categories state
        setShowAddCategoryModal(false); // Close the modal
        setFormData({ name: "", image: null, description: "" }); // Reset form
        alert("Category added successfully!");
      } else {
        alert("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("An error occurred while adding the category.");
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        console.log("Deleting category with ID:", id); // Debugging log

        const response = await fetch(
          `http://localhost:3001/api/categories/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setCategories((prev) =>
            prev.filter((category) => category._id !== id)
          );
          alert("Category deleted successfully!");
        } else {
          const errorData = await response.json(); // Parse error details
          console.error("Delete failed:", errorData);
          alert(
            `Failed to delete category: ${errorData.message || "Unknown error"}`
          );
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("An error occurred while deleting the category.");
      }
    }
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div
          className="cate d-flex align-items-center"
          style={{ justifyContent: "space-between" }}
        >
          <h1>Category</h1>

          {/* Add Category Button */}
          <Button
            variant="primary"
            onClick={() => setShowAddCategoryModal(true)}
          >
            Add Category
          </Button>
        </div>

        {/* Category Table */}
        <Table>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Actions</th> {/* Add a column for actions */}
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>
                    {category.image ? (
                      <img
                        src={`http://localhost:3001${category.image}`}
                        alt={category.name}
                        style={{ width: "50px", height: "auto" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td>{category.description}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No categories available</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Add Category Modal */}
        <Modal
          show={showAddCategoryModal}
          onHide={() => setShowAddCategoryModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formCategoryName" className="mb-3">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCategoryDescription" className="mb-3">
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCategoryImage" className="mb-3">
                <Form.Label>Category Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Add Category
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryPage;

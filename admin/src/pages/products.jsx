import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Bar from "../assets/pngtree.png"; // Assuming this is the barcode image
import EditProductModal from "./editproduct";
import JsBarcode from "jsbarcode";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const barcodeRef = useRef(null);
  const [categories, setCategories] = useState([]);

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

    fetchCategories();
  }, []);

  // Fetch products from the backend
  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products || []))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle SKU barcode modal
  useEffect(() => {
    if (selectedProduct && selectedProduct.sku && barcodeRef.current) {
      JsBarcode(barcodeRef.current, selectedProduct.sku, {
        format: "CODE128", // Barcode format
        displayValue: true, // Show SKU below the barcode
        fontSize: 18, // Adjust the font size of the SKU
        height: 60, // Adjust the height of the barcode
        width: 2, // Adjust the width of the barcode
      });
    }
  }, [selectedProduct]);
  const handleBarcodeIconClick = (product) => {
    setSelectedProduct(product);
    setShowBarcodeModal(true); // Show the barcode modal
  };

  // Handle "Edit" button click
  const handleEditClick = (product) => {
    setSelectedProduct(product); // Set the product to edit
    setShowEditProductModal(true); // Open the modal
  };

  const handleSave = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod._id === updatedProduct._id ? updatedProduct : prod
      )
    );
    setShowEditProductModal(false);
  };

  // Handle "Delete" button click
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        alert("Product deleted successfully!");
      } else {
        const errorText = await response.text();
        alert("Failed to delete product: " + errorText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  // Handle new product submission
  const handleNewProductSubmit = async (newProduct) => {
    const formData = new FormData();
    Object.keys(newProduct).forEach((key) =>
      formData.append(key, newProduct[key])
    );

    try {
      const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setProducts((prev) => [...prev, result.product]);
        setShowNewProductModal(false);
        alert("Product added successfully!");
      } else {
        const errorText = await response.text();
        alert("Error adding product: " + errorText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };

  // Function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown"; // Return 'Unknown' if category not found
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <button
          onClick={() => setShowNewProductModal(true)}
          className="btn btn-primary mb-3"
        >
          Add New Product
        </button>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Condition</th>
              <th>Quantity</th>
              <th>Cost Price</th>
              <th>Sale Price</th>
              <th>Status</th>
              <th>SKU</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>
                    {product.thumbnail ? (
                      <img
                        src={`http://localhost:3001/${product.thumbnail}`}
                        alt="Product Thumbnail"
                        style={{ width: "50px", height: "auto" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{product.title}</td>
                  <td>{getCategoryName(product.category)}</td>
                  <td>{product.location}</td>
                  <td>{product.condition}</td>
                  <td>{product.quantity}</td>
                  <td>{product.costPrice}</td>
                  <td>{product.salePrice}</td>
                  <td>
                    <span
                      style={{
                        color: product.quantity > 0 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {product.quantity > 0 ? "Available" : "Out of Stock"}
                    </span>
                  </td>
                  <td>
                    <img
                      src={Bar}
                      alt="Barcode Icon"
                      onClick={() => handleBarcodeIconClick(product)}
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No products available</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Edit Product Modal */}
        {selectedProduct && (
          <EditProductModal
            show={showEditProductModal}
            onHide={() => setShowEditProductModal(false)}
            product={selectedProduct}
            onSave={handleSave}
          />
        )}

        {/* Barcode Modal */}
        <Modal
          show={showBarcodeModal}
          onHide={() => setShowBarcodeModal(false)}
        >
          <Modal.Body>
            {selectedProduct && selectedProduct.sku ? (
              <div>
                <h4>{selectedProduct.title}</h4>
                <p>
                  <strong>SKU:</strong> {selectedProduct.sku}
                </p>
                <svg ref={barcodeRef}></svg>
              </div>
            ) : (
              <p>No product selected</p>
            )}
          </Modal.Body>
        </Modal>

        {/* Add New Product Modal */}
        <Modal
          show={showNewProductModal}
          onHide={() => setShowNewProductModal(false)}
        >
          <Modal.Body>
            <NewProductForm onSubmit={handleNewProductSubmit} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

const NewProductForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState({
    title: "",
    category: "",
    location: "",
    condition: "new",
    quantity: 0,
    costPrice: 0,
    salePrice: 0,
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          name="title"
          value={formState.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Category</label>
        <input
          name="category"
          value={formState.category}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Location</label>
        <input
          name="location"
          value={formState.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Condition</label>
        <select
          name="condition"
          value={formState.condition}
          onChange={handleChange}
        >
          <option value="new">New</option>
          <option value="refurbished">Refurbished</option>
          <option value="used">Used</option>
        </select>
      </div>
      <div>
        <label>Quantity</label>
        <input
          name="quantity"
          type="number"
          value={formState.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Cost Price</label>
        <input
          name="costPrice"
          type="number"
          value={formState.costPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Sale Price</label>
        <input
          name="salePrice"
          type="number"
          value={formState.salePrice}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Thumbnail</label>
        <input
          name="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductTable;

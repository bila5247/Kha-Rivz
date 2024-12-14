const express = require("express");
const router = express.Router();
const Product = require("../models/product"); // Import the Product model

// PUT endpoint to edit a product
router.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        // Find the product by ID and update it with the new data
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated product
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct); // Send the updated product data as a response
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Failed to update product" });
    }
});

module.exports = router;

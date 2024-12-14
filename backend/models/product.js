const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: String,
  title: String,
  location: String,
  condition: String,
  quantity: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  sku: { type: String, required: true },
  thumbnail: String,
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add userId to the product schema
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

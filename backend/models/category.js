const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

const Category = mongoose.model('Category', categorySchema);  // This is what needs to be exported

module.exports = Category;
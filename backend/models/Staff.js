const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    type: { type: String, required: true },
    password: { type: String, required: true }, // Add password field
    status: { type: String, default: "Active" }, // Add status field
    createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('Staff', UserSchema);

module.exports = UserModel;

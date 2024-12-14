// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema(
//  {
//     email : String,
//     password : String,
//     name : String,

// },
// {
//     collation: "UserInfo",
// }
// );

// mongoose.model("UserInfo", UserSchema);
   
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
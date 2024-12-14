const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
const UserModel = require('./models/Staff')
const Product = require("./models/product");
const multer = require('multer');
const path = require("path");
const Category = require('./models/category');
const fs = require('fs');

const JWT_SECRET = "madinachalkmadina12345678k4j9r9rw03003nmdfkrejeknmdskmfn43";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
// Serve static files (like images) from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/category', express.static(path.join(__dirname, 'uploads/category')));


// Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Directory to store the image
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Save with a timestamp
//   },
// });
const upload = multer({ dest: 'uploads/' });
const categoryUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads/category')); // Correct folder path
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
  }),
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const mongoUrl = "mongodb+srv://bila736g:H7695247@cluster0.xdvwwhs.mongodb.net/Ain?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

const User = require("./UserSchema");



// db.products.updateMany(
//   { sku: null },
//   { $set: { sku: `SKU-${Date.now()}` } } // Assign unique SKUs
// );

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.json({ status: "email already exists" });
    await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    return res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/admin", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const useremail = decoded.email;
    const user = await User.findOne({ email: useremail });
    if (user) {
      res.send({ status: "ok", data: user });
    } else {
      res.send({ status: "error", error: "User not found" });
    }
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

app.get('/staffs', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Error fetching users');
  }
});

app.get('/getStaff/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById({ id })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.put('/staffs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, date } = req.body;

    // Update the user with the new status and date
    const updatedUser = await UserModel.findByIdAndUpdate(id, { status, date }, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Error updating user');
  }
});

app.post('/createStaff', async (req, res) => {
  try {
    const { name, email, address, phone, type, password } = req.body;

    console.log('Received user data:', { name, email, address, phone, type, password });

    const newUser = new UserModel({ name, email, address, phone, type, password });

    const savedUser = await newUser.save();

    console.log('Saved user:', savedUser);

    res.status(201).send(savedUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send({ errors: { general: 'Failed to create user' } });
  }
});

// Route to update user
app.put('/updateStaff/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, phone, type } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(id, { name, email, address, phone, type }, { new: true });

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Error updating user');
  }
});



app.delete('/staffs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('User deleted successfully');
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send('Error deleting user');
  }
});


// Route to handle adding a product
// POST route to add a product, including an image
app.post('/api/products', upload.single('thumbnail'), async (req, res) => {
  try {
    const { category, title, location, condition, quantity, costPrice, salePrice, sku } = req.body;

    // Generate a unique SKU if not provided
    const uniqueSku = sku || `SKU-${Date.now()}`;

    const product = new Product({
      category,
      title,
      location,
      condition,
      quantity: parseInt(quantity, 10),
      costPrice: parseFloat(costPrice),
      salePrice: parseFloat(salePrice),
      sku: uniqueSku, // Ensure SKU is not null
      thumbnail: req.file ? req.file.path : null,
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      res.status(400).json({ message: 'Duplicate SKU value detected', error: error.keyValue });
    } else {
      console.error('Error in POST /api/products:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});
// Fetch products from the database// Backend API to get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); // Assuming `Product` is your Mongoose model
    res.status(200).json({ products }); // Ensure it's wrapped in a "products" object
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
// Serve uploaded files from 'uploads' folder
app.use("/uploads", express.static("uploads"));

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Backend API to get all products
// Your products endpoint
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
});




// DELETE API to delete a product by ID
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the product exists
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the product
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Edit product route
// PUT route to update a product
app.put('/api/products/:id', upload.single('thumbnail'), async (req, res) => {
  const productId = req.params.id;
  console.log('Received data:', req.body); // Log the incoming request data
  console.log('Received file:', req.file); // Log the uploaded file

  const { category, title, location, condition, quantity, costPrice, salePrice, sku } = req.body;

  // Handle quantity to ensure it's a valid number
  const parsedQuantity = quantity ? parseInt(quantity, 10) : 0; // Default to 0 if invalid
  const parsedCostPrice = costPrice ? parseFloat(costPrice) : 0; // Default to 0 if invalid
  const parsedSalePrice = salePrice ? parseFloat(salePrice) : 0; // Default to 0 if invalid

  // Handle the SKU
  const finalSku = sku || `SKU-${Date.now()}`;

  const thumbnail = req.file ? req.file.path : null;

  const updatedData = {
    category,
    title,
    location,
    condition,
    quantity: parsedQuantity,
    costPrice: parsedCostPrice,
    salePrice: parsedSalePrice,
    sku: finalSku,
    thumbnail: thumbnail || undefined,
  };

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error });
  }
});



app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find(); // Assuming you're using Mongoose
    res.json(categories); // This should return an array
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});
// Route to create a category
app.post('/api/categories', categoryUpload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if the required fields are provided
    if (!name || !description || !req.file) {
      return res.status(400).json({ error: 'Name, description, and image are required' });
    }
    const imagePath = `/uploads/category/${req.file.filename}`;
    const newCategory = new Category({ name, description, image: imagePath });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error in /api/categories POST:', error); // Log the error
    res.status(500).json({ error: 'Failed to create category', details: error.message });
  }
});

/// DELETE API to delete a category by ID
app.delete("/api/categories/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Importing required modules
    const fs = require("fs");
    const path = require("path");

    // Check if the category exists
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete the associated image file if it exists
    const imagePath = path.join(__dirname, category.image); // Ensure 'category.image' is valid
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete the category from the database
    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


// const router = express.Router();

app.post("/reset-password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Check if user ID exists
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }

    // Hash and update the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ status: "ok", message: "Password reset successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
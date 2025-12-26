const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config(); // Ensure dotenv is used for local variables if needed

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

/* ======================
   MONGODB CONNECTION
====================== */
// Connect to MongoDB using the environment variable
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Connect to DB immediately
connectDB();

/* ======================
   MONGOOSE MODEL
====================== */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

/* ======================
   ROOT ROUTE (API)
====================== */
app.get("/api", (req, res) => {
  res.send("Backend is running properly with MongoDB!");
});

/* ======================
   GET ALL USERS
====================== */
app.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    // Transform _id to id for frontend compatibility if needed, though frontend usually adapts.
    // Let's map it to ensure compatibility with existing frontend code expecting 'id'
    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name
    }));
    res.json(formattedUsers);
  } catch (error) {
    next(error);
  }
});

/* ======================
   ADD USER
====================== */
app.post("/users", async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newUser = await User.create({ name });

    res.status(201).json({
      id: newUser._id,
      name: newUser.name
    });
  } catch (error) {
    next(error);
  }
});

/* ======================
   UPDATE USER (PUT)
====================== */
app.put("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated",
      user: { id: updatedUser._id, name: updatedUser.name }
    });
  } catch (error) {
    next(error);
  }
});

/* ======================
   DELETE USER
====================== */
app.delete("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
});

/* ======================
   ERROR HANDLER
====================== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

/* ======================
   CATCH-ALL FOR REACT ROUTER
====================== */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

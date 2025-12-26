const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// TEMP DATA (Fake DB)
let users = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Amit" }
];

/* ======================
   ROOT ROUTE (API)
====================== */
app.get("/api", (req, res) => {
  res.send("Backend is running properly!");
});

/* ======================
   GET ALL USERS
====================== */
app.get("/users", (req, res, next) => {
  try {
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/* ======================
   ADD USER
====================== */
app.post("/users", (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newUser = {
      id: Date.now(),
      name
    };

    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

/* ======================
   UPDATE USER (PUT)
====================== */
app.put("/users/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const user = users.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    res.json({ message: "User updated", user });
  } catch (error) {
    next(error);
  }
});

/* ======================
   DELETE USER
====================== */
app.delete("/users/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);

    users = users.filter(u => u.id !== id);

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

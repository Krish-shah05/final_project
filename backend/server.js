const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// TEMP DATA (Fake DB)
let users = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Amit" }
];

/* ======================
   GET ALL USERS
====================== */
app.get("/users", (req, res) => {
  res.json(users);
});

/* ======================
   ADD USER
====================== */
app.post("/users", (req, res) => {
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
});

/* ======================
   UPDATE USER (PUT)
====================== */
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = name;
  res.json({ message: "User updated", user });
});

/* ======================
   DELETE USER
====================== */
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  users = users.filter(u => u.id !== id);

  res.json({ message: "User deleted" });
});

/* ======================
   START SERVER
====================== */
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

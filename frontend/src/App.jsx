import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  /* ======================
     FETCH USERS
  ====================== */
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchUsers = async () => {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ======================
     ADD OR UPDATE USER
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setMessage("Name required");
      return;
    }

    if (editId) {
      // UPDATE
      await fetch(`${API_URL}/users/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      setMessage("User updated");
      setEditId(null);
    } else {
      // ADD
      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      setMessage("User added");
    }

    setName("");
    fetchUsers();
  };

  /* ======================
     DELETE USER
  ====================== */
  const deleteUser = async (id) => {
    await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE"
    });
    setMessage("User deleted");
    fetchUsers();
  };

  /* ======================
     EDIT USER
  ====================== */
  const editUser = (user) => {
    setName(user.name);
    setEditId(user.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">
          {editId ? "Update User" : "Add User"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

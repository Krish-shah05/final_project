import { useEffect, useState } from "react";

function UserManager() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");

    /* ======================
       FETCH USERS
    ====================== */
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_URL}/users`);
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            setMessage("Error fetching users. Ensure backend is running.");
        }
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

        try {
            if (editId) {
                // UPDATE
                const res = await fetch(`${API_URL}/users/${editId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name })
                });
                if (!res.ok) throw new Error("Failed to update user");
                setMessage("User updated");
                setEditId(null);
            } else {
                // ADD
                const res = await fetch(`${API_URL}/users`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name })
                });
                if (!res.ok) throw new Error("Failed to add user");
                setMessage("User added");
            }

            setName("");
            fetchUsers();
        } catch (error) {
            console.error("Error saving user:", error);
            setMessage("Error saving user.");
        }
    };

    /* ======================
       DELETE USER
    ====================== */
    const deleteUser = async (id) => {
        try {
            const res = await fetch(`${API_URL}/users/${id}`, {
                method: "DELETE"
            });
            if (!res.ok) throw new Error("Failed to delete user");
            setMessage("User deleted");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
            setMessage("Error deleting user.");
        }
    };

    /* ======================
       EDIT USER
    ====================== */
    const editUser = (user) => {
        setName(user.name);
        setEditId(user.id);
    };

    return (
        <div className="p-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">User Management</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <form onSubmit={handleSubmit} className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter name"
                        className="flex-1 p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                        {editId ? "Update User" : "Add User"}
                    </button>
                </form>
                {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
            </div>

            <ul className="space-y-3">
                {users.map((user) => (
                    <li key={user.id} className="flex justify-between items-center bg-gray-50 p-4 rounded shadow-sm">
                        <span className="font-medium text-gray-700">{user.name}</span>
                        <div className="space-x-2">
                            <button
                                onClick={() => editUser(user)}
                                className="text-yellow-600 hover:text-yellow-700 font-medium"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteUser(user.id)}
                                className="text-red-600 hover:text-red-700 font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserManager;

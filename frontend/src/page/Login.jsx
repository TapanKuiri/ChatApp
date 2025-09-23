import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MessageContext } from "../context/MessageContext";

export default function Login() {
  const { setCode } = useContext(MessageContext);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) return alert("Enter credentials");

    try {
      setLoading(true);
      const res = await axios.post(`${backend}/api/users/login`, { userId, password });
      if (res.data.success) {
        setLoading(false);
        setCode(res.data.message);
        navigate("/chat");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-medium mb-4">Login</h2>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          placeholder="User ID"
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          placeholder="Password"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

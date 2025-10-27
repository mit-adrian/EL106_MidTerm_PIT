// src/pages/RegisterPage.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (form.password !== form.password2) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await API.post("/auth/register/", {
        username: form.username,
        email: form.email,
        password: form.password,
        password2: form.password2,
      });

      setSuccess(
        "Registration successful! Check your email to verify your account."
      );

      // Optional: redirect to login after 2 seconds
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.username?.join(" ") ||
          err.response?.data?.email?.join(" ") ||
          err.response?.data?.password?.join(" ") ||
          err.response?.data?.password2?.join(" ") ||
          err.response?.data?.detail ||
          "Network or server error. Check console."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: 12 }}>Register as Writer</h2>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={submit} style={styles.form}>
          <label style={styles.label}>
            Username
            <input
              name="username"
              value={form.username}
              onChange={onChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Confirm Password
            <input
              type="password"
              name="password2"
              value={form.password2}
              onChange={onChange}
              required
              style={styles.input}
            />
          </label>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Registering…" : "Register"}
          </button>
        </form>

        <div style={{ marginTop: 12 }}>
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}

// inline styles
const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 360,
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    background: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: 14,
  },
  input: {
    padding: "8px 10px",
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ddd",
    marginTop: 6,
  },
  button: {
    marginTop: 6,
    padding: "10px 12px",
    background: "#2f6fed",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  error: {
    background: "#ffe6e6",
    color: "#b00020",
    padding: "8px 10px",
    borderRadius: 4,
    marginBottom: 8,
  },
  success: {
    background: "#e6ffe6",
    color: "#006400",
    padding: "8px 10px",
    borderRadius: 4,
    marginBottom: 8,
  },
};

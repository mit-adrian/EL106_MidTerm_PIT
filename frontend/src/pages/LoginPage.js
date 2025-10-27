// src/pages/LoginPage.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      const access = localStorage.getItem("access");
      if (!access) return;

      try {
        const profileRes = await API.get("/auth/profile/", {
          headers: { Authorization: `Bearer ${access}` },
        });
        const role = profileRes.data.role?.toLowerCase();

        if (role === "writer") navigate("/dashboard", { replace: true });
        else if (role === "admin" || role === "manager")
          navigate("/admin-dashboard", { replace: true });
      } catch (err) {
        console.warn("Failed to fetch profile:", err);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    };

    checkLoggedIn();
  }, [navigate]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await API.post("auth/token/", {
        username: form.username,
        password: form.password,
      });

      const { access, refresh } = res.data;
      if (!access || !refresh) {
        setError("Invalid server response: tokens missing.");
        setLoading(false);
        return;
      }

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      const profileRes = await API.get("/auth/profile/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      const role = profileRes.data.role?.toLowerCase();

      if (role === "writer") navigate("/dashboard", { replace: true });
      else if (role === "admin" || role === "manager")
        navigate("/admin-dashboard", { replace: true });
      else setError("Unknown user role: " + profileRes.data.role);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.non_field_errors?.join(" ") ||
          "Network or server error. Check console."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: 12 }}>Login</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={submit} style={styles.form}>
          <label style={styles.label}>
            Username
            <input
              name="username"
              value={form.username}
              onChange={onChange}
              required
              style={styles.input}
              autoComplete="username"
            />
          </label>
          <label style={styles.label}>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              required
              style={styles.input}
              autoComplete="current-password"
            />
          </label>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <div style={{ marginTop: 12 }}>
          <Link to="/register">Be A Writer</Link> ·{" "}
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

// Inline styles
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
};

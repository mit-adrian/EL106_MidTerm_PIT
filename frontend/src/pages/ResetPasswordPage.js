// src/pages/ResetPasswordPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uidb64 = queryParams.get("uidb64");
  const token = queryParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uidb64 || !token) {
      setError("Invalid reset link. Missing parameters.");
    }
  }, [uidb64, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/reset-password/", {
        uidb64,
        token,
        password,
      });

      setMessage(res.data.detail || "Password reset successful!");
      setTimeout(() => {
        navigate("/login"); // Redirect to login after success
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          "Failed to reset password. Link may be invalid or expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: 12 }}>Reset Password</h2>
        {message && <div style={styles.success}>{message}</div>}
        {error && <div style={styles.error}>{error}</div>}
        {!message && (
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>
              New Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={styles.input}
              />
            </label>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Resetting…" : "Reset Password"}
            </button>
          </form>
        )}
        <div style={{ marginTop: 12 }}>
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

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
    background: "#e6ffed",
    color: "#027a00",
    padding: "8px 10px",
    borderRadius: 4,
    marginBottom: 8,
  },
};

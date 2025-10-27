import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false); // for showing success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/auth/forgot-password/", {
        email,
      });
      setSuccess(true); // show success message
      setMessage("Check your email for the reset link.");

      // Optional: automatically redirect to login after 5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      setSuccess(false);
      setMessage(err.response?.data?.detail || "Something went wrong.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Forgot Password</h2>

      {!success ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button type="submit" style={{ padding: "10px 20px" }}>
            Reset Password
          </button>
        </form>
      ) : (
        <div>
          <p>{message}</p>
          <button
            onClick={() => navigate("/login")}
            style={{ padding: "10px 20px" }}
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordPage;

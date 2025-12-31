import { useState } from "react";
import api from "../../utils/axios";
import "./Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await api.post("/users/forgot-password/", { email });
      setMessage("Password reset link sent to your email");
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Unable to send reset link"
      );
    }
  };

  return (
    <section className="auth-wrapper">
      <div className="auth-card">
        <h1>Forgot password</h1>
        <p>Enter your email and we’ll send a reset link.</p>

        <form onSubmit={handleSubmit}>
          <div className="auth-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <p className="auth-success">{message}</p>}
          {error && <p className="auth-error">{error}</p>}

          <button className="btn-primary">
            Send reset link
          </button>
        </form>
      </div>
    </section>
  );
}

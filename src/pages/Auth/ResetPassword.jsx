import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import "./Auth.css";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await api.post("/users/reset-password/", {
        token,
        password,
        confirm_password: confirm,
      });

      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Reset failed. Invalid or expired link."
      );
    }
  }

  return (
    <section className="auth-wrapper">
      <div className="auth-card">
        <h1>Reset password</h1>
        <p>Create a new password for your account.</p>

        <form onSubmit={handleSubmit}>
          <div className="auth-group">
            <label>New password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-group">
            <label>Confirm password</label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="btn-primary">
            Reset password
          </button>
        </form>
      </div>
    </section>
  );
}

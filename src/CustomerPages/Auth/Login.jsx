import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.api";
import { saveTokens } from "../../utils/auth";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔁 If already logged in, redirect
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/products");
    }
  }, [navigate]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await loginUser(email, password);
    saveTokens(res.data);
    navigate("/products", { replace: true });
  } catch (err) {
    const status = err.response?.status;

    if (status === 401) {
      setError("The email or password you entered is incorrect.");
    } else if (status === 404) {
      setError("We couldn’t find an account with this email.");
    } else {
      setError("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="auth-wrapper">
      <div className="auth-card">
        <h1>Sign in</h1>

        <form onSubmit={handleSubmit}>
          <div className="auth-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="auth-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-forgot">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Don’t have an account?</span>
          <Link to="/signup">Create one</Link>
        </div>
      </div>
    </section>
  );
}

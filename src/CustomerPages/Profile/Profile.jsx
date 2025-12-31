import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
    <section className="profile-wrapper">
      <h1 className="profile-title">My Account</h1>

      {!isLoggedIn ? (
        /* NOT LOGGED IN */
        <div className="profile-guest">
          <p>Please login to access your account.</p>
          <button
            className="btn-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      ) : (
        /* LOGGED IN */
        <div className="profile-actions">
          <button
            className="profile-card"
            onClick={() => navigate("/cart")}
          >
            🛒 My Cart
          </button>

          <button
            className="profile-card"
            onClick={() => navigate("/orders")}
          >
            📦 My Orders
          </button>

          <button
            className="profile-card logout"
            onClick={logout}
          >
            🚪 Logout
          </button>
        </div>
      )}
    </section>
  );
}

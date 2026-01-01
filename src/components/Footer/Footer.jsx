import { FiInstagram, FiTwitter, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="lux-footer">
      <div className="lux-footer-inner">

        {/* BRAND */}
        <div className="lux-footer-brand">
          <h2>NOIR</h2>
          <p>
            Crafted for presence. <br />
            Designed to linger.
          </p>
        </div>

        {/* LINKS */}
        <div className="lux-footer-links">
          <div>
            <span>Shop</span>
            <a href="/products">Products</a>
            <a href="/stores">Stores</a>
            <a href="/orders">Orders</a>
          </div>

          <div>
            <span>Support</span>
            <a href="/refund-policy">Refund Policy</a>
            <a href="/forgot-password">Account Recovery</a>
            <a href="mailto:support@noirelixir.com">Contact</a>
          </div>
        </div>

        {/* CONTACT */}
        <div className="lux-footer-contact">
          <span>Connect</span>

          <div className="lux-footer-icons">
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a href="mailto:support@noirelixir.com" aria-label="Email">
              <FiMail />
            </a>

            <a href="#" aria-label="Instagram">
              <FiInstagram />
            </a>

            <a href="#" aria-label="Twitter">
              <FiTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="lux-footer-bottom">
        <span>© {new Date().getFullYear()} NOIR ÉLIXIR</span>
        <span>Luxury Fragrance House</span>
      </div>
    </footer>
  );
}

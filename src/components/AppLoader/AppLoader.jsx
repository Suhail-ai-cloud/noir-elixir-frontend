import "./AppLoader.css";

export default function AppLoader() {
  return (
    <div className="app-loader">
      <div className="loader-content">
        <h1 className="loader-logo">NOIR</h1>
        <p className="loader-tagline">Crafted for presence</p>

        <div className="loader-line">
          <span />
        </div>
      </div>
    </div>
  );
}

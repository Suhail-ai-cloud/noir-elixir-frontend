import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppLoader from "../components/AppLoader/AppLoader";

export default function RouteLoader({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0); // reset scroll
    }, 600); // Apple-like delay

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) return <AppLoader />;

  return children;
}

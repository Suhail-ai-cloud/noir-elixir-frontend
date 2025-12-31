import { Routes, Route } from "react-router-dom";
import ProductListing from "@/CustomerPages/ProductListing/ProductListing";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductListing />} />
      {/* later */}
      {/* <Route path="/product/:slug" element={<ProductDetail />} /> */}
    </Routes>
  );
}

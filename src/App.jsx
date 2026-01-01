// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar/Navbar";

// // Pages
// import Home from "./pages/Home";
// import Signup from "./pages/Auth/Signup";
// import Login from "./CustomerPages/Auth/Login";
// import ForgotPassword from "./pages/Auth/ForgotPassword";
// import ResetPassword from "./pages/Auth/ResetPassword";

// // Customer pages
// import ProductListing from "./CustomerPages/ProductListing/ProductListing";
// import ProductDetail from "./CustomerPages/ProductDetail/ProductDetail";
// import Profile from "./CustomerPages/Profile/Profile";
// import Cart from "./CustomerPages/Cart/Cart";
// import Checkout from "./CustomerPages/Checkout/Checkout";
// import Payment from "./CustomerPages/Payment/Payment";
// import MyOrders from "./CustomerPages/orders/MyOrders";
// import Stores from "./CustomerPages/Stores/Stores";
// import OrderSuccess  from "./CustomerPages/OrderSuccess/OrderSuccess";
// import RefundPolicy  from "./CustomerPages/RefundPolicy/RefundPolicy";

// // 🔐 Protected Route
// import ProtectedRoute from "./routes/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       {/* GLOBAL NAVBAR */}
//       <Navbar />

//       <Routes>
//         {/* PUBLIC */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/stores" element={<Stores />} />
//         <Route path="/refund-policy" element={<RefundPolicy />} />

//         {/* 🔐 PROTECTED */}
//         <Route
//           path="/products"
//           element={
//             <ProtectedRoute>
//               <ProductListing />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/products/:slug"
//           element={
//             <ProtectedRoute>
//               <ProductDetail />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute>
//               <Cart />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/checkout"
//           element={
//             <ProtectedRoute>
//               <Checkout />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/payment"
//           element={
//             <ProtectedRoute>
//               <Payment />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/orders"
//           element={
//             <ProtectedRoute>
//               <MyOrders />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/order-success" element={<OrderSuccess />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import AppLoader from "./components/AppLoader/AppLoader";
import Footer from "./components/Footer/Footer";
import RouteLoader from "./routes/RouteLoader";
import { wakeBackend } from "./services/health.api";
import { initSmoothScroll } from "./utils/smoothScroll";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Auth/Signup";
import Login from "./CustomerPages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

// Customer pages
import ProductListing from "./CustomerPages/ProductListing/ProductListing";
import ProductDetail from "./CustomerPages/ProductDetail/ProductDetail";
import Profile from "./CustomerPages/Profile/Profile";
import Cart from "./CustomerPages/Cart/Cart";
import Checkout from "./CustomerPages/Checkout/Checkout";
import Payment from "./CustomerPages/Payment/Payment";
import MyOrders from "./CustomerPages/orders/MyOrders";
import Stores from "./CustomerPages/Stores/Stores";
import OrderSuccess from "./CustomerPages/OrderSuccess/OrderSuccess";
import RefundPolicy from "./CustomerPages/RefundPolicy/RefundPolicy";


// 🔐 Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await wakeBackend(); // 🔥 wake backend
      } catch (err) {
        console.warn("Backend cold start...");
      } finally {
        setAppReady(true);
        requestAnimationFrame(() => {
          initSmoothScroll(); // 🍎 Apple smooth scroll
        });
      }
    };

    init();
  }, []);

  /* ⛔ FIRST LOAD */
  if (!appReady) return <AppLoader />;

  return (
    <BrowserRouter>
      <Navbar />

      {/* GSAP REQUIRED WRAPPER */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <RouteLoader>
            <Routes>
              {/* PUBLIC */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />

              {/* 🔐 PROTECTED */}
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <ProductListing />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/products/:slug"
                element={
                  <ProtectedRoute>
                    <ProductDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                }
              />

              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
          </RouteLoader>
          <Footer />
        </div>
      </div>
       
    </BrowserRouter>
  );
}

export default App;

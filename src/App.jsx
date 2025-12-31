// // import Home from "./pages/Home";


// // function App() {
// //   return <Home />;
// // }

// // export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import ProductListing from "./CustomerPages/ProductListing/ProductListing";
// import ProductDetail from "./CustomerPages/ProductDetail/ProductDetail";
// import Profile from "./CustomerPages/Profile/Profile";
// import Login from "./CustomerPages/Auth/Login";
// import Cart from "./CustomerPages/Cart/Cart";
// import Checkout from "./CustomerPages/Checkout/Checkout";
// import Payment from "./CustomerPages/Payment/Payment";
// import MyOrders from "./CustomerPages/orders/MyOrders";
// import Navbar from "./components/Navbar/Navbar";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Home page */}
//         <Route path="/" element={<Home />} />

//         {/* Product listing */}
//         <Route path="/products" element={<ProductListing />} />
//         <Route path="/products/:slug" element={<ProductDetail />} />
//         <Route path="/Profile" element={<Profile />} />
//         <Route path="/Login" element={<Login />} />
//          <Route path="/Cart" element={<Cart />} />
//          <Route path="/Checkout" element={<Checkout />} />
//          <Route path="/Payment" element={<Payment />} />
//          <Route path="/orders" element={<MyOrders />} />

//         {/* Future */}
//         {/* <Route path="/product/:slug" element={<ProductDetail />} /> */}
//         {/* <Route path="/cart" element={<Cart />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";

import Signup from "./pages/Auth/Signup";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";

import ProductListing from "./CustomerPages/ProductListing/ProductListing";
import ProductDetail from "./CustomerPages/ProductDetail/ProductDetail";
import Profile from "./CustomerPages/Profile/Profile";
import Login from "./CustomerPages/Auth/Login";
import Cart from "./CustomerPages/Cart/Cart";
import Checkout from "./CustomerPages/Checkout/Checkout";
import Payment from "./CustomerPages/Payment/Payment";
import RefundPolicy from "./CustomerPages/RefundPolicy/RefundPolicy";
import MyOrders from "./CustomerPages/orders/MyOrders";
import Stores from "./CustomerPages/Stores/Stores";


function App() {
  return (
    <BrowserRouter>
      {/* 🌫 GLOBAL GLASS NAVBAR */}
      <Navbar />

      {/* 🧭 ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:slug" element={<ProductDetail />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<MyOrders />} />

        <Route path="/Stores" element={<Stores />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;

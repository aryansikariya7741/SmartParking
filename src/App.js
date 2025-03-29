import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import Admin from "./pages/Admin";  // Import Admin Pa
import LoginSignup from "./pages/LoginSignup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} /> {/* ✅ Navbar */}
        <Route path="/" element={<Footer />} /> {/* ✅ Footer */}
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingPage />} /> {/* ✅ Booking Route */}
        <Route path="/admin" element={<Admin />} />  {/* ✅ Admin Route */}
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import DetectionPage from "./pages/Detection";
import BookingPage from "./pages/BookingPage";
import Admin from "./pages/Admin";  // Import Admin Pa
import LoginSignup from "./pages/LoginSignup";

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> {/* ✅ About Route */}
        <Route path="/detection" element={<DetectionPage />} />
        <Route path="/booking" element={<BookingPage />} /> {/* ✅ Booking Route */}
        <Route path="/admin" element={<Admin />} />  {/* ✅ Admin Route */}
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
};

export default App;

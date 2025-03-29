import React, { useState, useEffect } from "react";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>SmartPark AI</h2>
      <ul style={styles.navLinks}>
        <li><a href="#" style={styles.link}>Home</a></li>
        <li><a href="#" style={styles.link}>Pricing</a></li>
        <li><a href="#" style={styles.link}>Book Slot</a></li>
      </ul>
    </nav>
  );
}

function App() {
  const [price, setPrice] = useState(20);

  useEffect(() => {
    const updatePrice = () => {
      setPrice((Math.random() * 20 + 10).toFixed(2));
    };
    const interval = setInterval(updatePrice, 3000);
    return () => clearInterval(interval);
  }, []);

  const bookSlot = () => {
    alert("Slot Booked Successfully! 🎉");
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h1 style={styles.title}>Welcome to SmartPark AI</h1>
      <p style={styles.description}>
        AI-powered parking slot detection using YOLO with dynamic pricing.
      </p>
      <div style={styles.price}>Dynamic Price: ₹{price}</div>
      <button style={styles.button} onClick={bookSlot}>Book a Slot</button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    background: "#111",
    color: "white",
    minHeight: "100vh",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#222",
    color: "white",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  title: {
    fontSize: "40px",
    color: "#00ffcc",
  },
  description: {
    fontSize: "18px",
  },
  price: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "20px 0",
    padding: "10px",
    background: "rgba(0, 255, 100, 0.2)",
    border: "2px solid #00ff00",
    display: "inline-block",
  },
  button: {
    padding: "15px 30px",
    fontSize: "20px",
    fontWeight: "bold",
    background: "#ffcc00",
    color: "black",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default App;
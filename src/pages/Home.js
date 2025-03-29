import React, { useState, useEffect } from "react";

function Home() {
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

export default Home;

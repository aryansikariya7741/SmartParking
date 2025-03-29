import React, { useState } from "react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hover, setHover] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${isLogin ? "Login" : "Sign Up"} Successful!\n${!isLogin ? `Username: ${username}\n` : ""}Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div style={styles.container}>
      <div 
        style={{ ...styles.box, ...(hover ? styles.boxHover : {}) }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h2 style={styles.heading}>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button 
            type="submit" 
            style={{ ...styles.button, ...(hover ? styles.buttonHover : {}) }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p 
          style={{ ...styles.text, ...(hover ? styles.textHover : {}) }} 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #1e1e1e, #2a2a2a)",
    margin: 0,
    fontFamily: "Arial, sans-serif",
  },
  box: {
    background: "#222",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    transform: "perspective(1000px) rotateX(10deg) scale(1)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  },
  boxHover: {
    transform: "perspective(1000px) rotateX(0deg) scale(1.05)",
    boxShadow: "15px 15px 30px rgba(0, 0, 0, 0.8)",
  },
  heading: {
    color: "white",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "none",
    borderRadius: "8px",
    background: "#333",
    color: "white",
    fontSize: "16px",
    transition: "background 0.3s ease-in-out",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(45deg, #007BFF, #0056b3)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "transform 0.2s ease-in-out, background 0.3s ease-in-out",
  },
  buttonHover: {
    transform: "scale(1.05)",
    background: "linear-gradient(45deg, #0056b3, #003b80)",
  },
  text: {
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
    textDecoration: "none",
    transition: "color 0.3s ease-in-out",
  },
  textHover: {
    color: "#007BFF",
  },
};

export default LoginSignup;

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons for password visibility
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./LoginPage.css";

function LoginPage() {
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        emailid,
        password,
      });

      // Store token in localStorage
      localStorage.setItem("userToken", response.data.token);

      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/"); // Redirect to home
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <main className="login-main">
        <h1>Login</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={emailid}
            onChange={(e) => setEmailid(e.target.value)}
            required
          />
          
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;

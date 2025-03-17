import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");  // For error handling
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // On successful login, store the JWT token in localStorage
        localStorage.setItem("token", data.token);
        // Redirect to the dashboard or homepage after login
        navigate("/dashboard");
      } else {
        setErrorMessage(data.message || "Login failed. Please try again."); // Show error if login fails
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="auth-container container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h3 className="text-center">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Display error message */}
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <a
              style={{ textDecoration: "underline", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => navigate(`/registration`)}
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

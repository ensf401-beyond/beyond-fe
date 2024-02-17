import React, { useState, useEffect } from "react";
import LoginButton from "./LoginButton";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const { handleLogin } = useAuth();

  useEffect(() => {
    setErrMessage("");
  }, [user, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mainbg">
      <section className="login-form-content">
        <p
          className={errMessage ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMessage}
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-header">Login</h1>
          <label className="login-form-label" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="login-input"
            autoComplete="username"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <label className="login-form-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            value={password}
            required
          />
          <div className="login-buttons-container">
            <button
              className="login-button"
              onClick={() => {
                handleLogin();
              }}
            >
              Log In
            </button>
            <LoginButton handleLogin={handleLogin} />
          </div>
          <div className="register-links">
            <p>Don't have an account?</p>
            <Link className="register-route" to="/register">
              Register here.
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;

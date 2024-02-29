import React, { useState, useEffect } from "react";
import LoginButton from "./LoginButton";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { userLoginData } from "../../../utils/dataClasses";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const { handleLogin } = useAuth();

  useEffect(() => {
    setErrMessage("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    let userData : userLoginData = {
      email: email,
      password: password,
      isGoogle: false
    }


    // TODOISAAC: uncomment this when the backend is implemented
    // const res = await loginUser(userData);

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
            Email:
          </label>
          <input
            type="email"
            id="username"
            className="login-input"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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

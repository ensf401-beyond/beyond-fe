import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface userRegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface RegisterProps {
  onRegister: (userRegisterData: userRegisterData) => void;
}

function RegistrationForm({ onRegister }: RegisterProps) {
  const { handleLogin } = useAuth();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: userRegisterData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    };
    onRegister(userData);
    handleLogin();

    navigateToHome();
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="registration-form-container">
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="first-name-field">
            <label className="first-name-label" htmlFor="first-name">
              First Name:
            </label>
            <input
              className="first-name-input"
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              pattern="[A-Z]?[a-z]+"
              required
            />
          </div>
          <div className="last-name-field">
            <label className="last-name-label" htmlFor="last-name-field">
              Last Name:
            </label>
            <input
              className="last-name-input"
              id="last-name-field"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              pattern="[A-Z]?[a-z]+"
              required
            />
          </div>
          <div className="email-field">
            <label className="email-label" htmlFor="email">
              Email:
            </label>
            <input
              className="email-input"
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="username-field">
            <label className="username-label" htmlFor="username">
              Username:
            </label>
            <input
              className="username-input"
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="password-field">
            <label className="password-label" htmlFor="password">
              Password:
            </label>
            <input
              className="password-input"
              id="password"
              type="password"
              autoComplete="new-password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="register-button" type="submit">
            Register
          </button>
          <p>
            Already a user?
            <Link to="/login" className="login-link">
              Login here.
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default RegistrationForm;

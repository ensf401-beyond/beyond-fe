import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LogoutButton from "../UserAuthentication/Login/LogoutButton";
import "./Profile.css";

function Profile() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pfp, setPfp] = useState<string>("");

  const { handleLogout } = useAuth();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(name, email);
    // TODO: send the data to the backend
    localStorage.setItem("Name", name);
    localStorage.setItem("Email", email);

  };

  const getInfo = () => {
    setName(localStorage.getItem("Name") || "");
    setEmail(localStorage.getItem("Email") || "");
    setPfp(localStorage.getItem("PFP") || "");
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="profile-page">
        <div className="profile-image-and-links">
          <img src={pfp} alt="PFP" className="profile-pfp" />
        </div>
        <div className="profile-feilds">
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-feild">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="profile-feild">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button type="submit" className="profile-submit small-button">
              Confirm
            </button>
          </form>
          <button className="small-button">
            <Link to="/favorites" className="profile-link">
              Go to Favorites
            </Link>
          </button>
          <LogoutButton handleLogout={handleLogout} />
        </div>
      </div>
    </>
  );
}

export default Profile;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LogoutButton from "../UserAuthentication/Login/LogoutButton";
import { editUser } from "../../utils/userController";
import pfp_placeholder from "../../assets/images/pfp_placeholder.png";
import "./Profile.css";

function Profile() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pfp, setPfp] = useState<string>("");
  const [editMode, setEditMode] = useState(false);

  const [confirmedName, setConfirmedName] = useState<string>("");
  const [confirmedPfp, setConfirmedPfp] = useState<string>("");

  const { handleLogout } = useAuth();

  const getInfo = () => {
    setEmail(localStorage.getItem("Email") || "");
    const storedName = localStorage.getItem("Name") || "";
    const storedPfp = localStorage.getItem("PFP") || pfp_placeholder;
    setName(storedName);
    setPfp(storedPfp);
    setConfirmedName(storedName);
    setConfirmedPfp(storedPfp);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      email,
      username: name,
      profilePic: pfp,
    };
    const response = await editUser(userData);
    if (response.error) {
      alert(`Error: ${response.error}`);
    } else {
      localStorage.setItem("Name", name);
      localStorage.setItem("PFP", pfp);
      setConfirmedName(name);
      setConfirmedPfp(pfp);
      setEditMode(false);
      const event = new Event('storage');
      window.dispatchEvent(event);
      alert('Profile updated successfully');
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setName(confirmedName);
    setPfp(confirmedPfp);
  }

  return (
    <>
      <div className="profile-page">
        <div className="profile-image-and-links">
          {editMode ? (
              <img src={pfp} alt="Profile" className="profile-pfp" />
            ) : (
              <img src={confirmedPfp} alt="Profile" className="profile-pfp" />
            )}
        </div>
        <div className="profile-fields">
          {editMode ? (
              <form className="profile-form" onSubmit={handleSubmit}>
                <h1>Edit Profile</h1>
                <div className="profile-field">
                  <label htmlFor="pfp">Profile Picture URL: </label>
                  <input
                    type="text"
                    placeholder="New profile pic URL"
                    value={pfp}
                    onChange={(e) => setPfp(e.target.value)}
                  />
                </div>
                <div className="profile-field">
                  <label htmlFor="username">Username:</label>
                  <input
                    id="username"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="profile-field">
                  <label>Email:</label>
                  <span>{email}</span>
                </div>
                <button type="submit" className="small-button">Save Changes</button>
                <button onClick={handleCancel} className="small-button">Cancel</button>
              </form>
            ) : (
              <>
              <div className="profile-field">
                <span>Name: </span>
                {confirmedName}
              </div>
              <div className="profile-field">
              <span>Email: </span>
                {email}
              </div>
              <button onClick={() => setEditMode(true)} className="small-button">Edit Profile</button>
              </>
            )}
          <button className="small-button">
            <Link to="/favourites" className="profile-link">
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

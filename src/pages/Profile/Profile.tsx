import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LogoutButton from "../UserAuthentication/Login/LogoutButton";
import { editUser, deleteUser } from "../../utils/userController";
import pfp_placeholder from "../../assets/images/pfp_placeholder.png";
import "./Profile.css";

/**
 * Profile Component
 *
 * This component is used to display the user's profile, including their name, email, and profile picture,
 * and also edit the profile's username and profile picture.
 *
 * State:
 * - name (string): Stores the user's name.
 * - email (string): Stores the user's email.
 * - pfp (string): Stores the URL of the user's profile picture.
 * - editMode (boolean): Indicates whether the user is in edit mode.
 * - confirmedName (string): Stores the user's name that is confirmed after editing.
 * - confirmedPfp (string): Stores the URL of the user's profile picture that is confirmed after editing.
 *
 * Components:
 * - useAuth: A custom React hook from the AuthContext that manages authentication.
 * - LogoutButton: A component that renders a logout button.
 * - editUser: A function from userController that handles updating the user's profile.
 * - pfp_placeholder: A placeholder image URL for the user's profile picture.
 *
 * Functions:
 * - getInfo(): Fetches and sets the user's profile information from local storage.
 * - handleSubmit(e: React.FormEvent<HTMLFormElement>): Handles the form submission for editing the user's profile.
 * - handleCancel(): Handles the cancellation of profile editing.
 * - handleDeleteProfile(): Handles the deletion of the user's profile.
 * 
 * @returns the view for the profile page of the website
 *
 */
function Profile() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pfp, setPfp] = useState<string>("");
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const password = userData ? userData.password : "";
  const isGoogle = userData ? userData.isGoogle : false;
  const googleAccessToken = userData ? userData.googleAccessToken : "";
  
  const [editMode, setEditMode] = useState(false);

  const [confirmedName, setConfirmedName] = useState<string>("");
  const [confirmedPfp, setConfirmedPfp] = useState<string>("");

  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const getInfo = () => {
    setEmail(localStorage.getItem("Email") || "");
    const storedName = localStorage.getItem("Name") || "";
    const storedPfp = localStorage.getItem("PFP") || "";
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

  const handleDeleteProfile = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete your profile? This cannot be undone.');
    if (isConfirmed) {
      setEditMode(false);
      const response = await deleteUser({ 
        email, 
        password: password, 
        isGoogle: isGoogle, 
        access_token: googleAccessToken 
      });
      if (response && response.message === 'User deleted successfully') {
        alert('Your profile has been successfully deleted.');
        window.localStorage.setItem("Email", "");
        localStorage.removeItem("Favourites");
        localStorage.removeItem("userData");
        sessionStorage.removeItem("isLoggedIn");
        handleLogout();
        window.dispatchEvent(new Event("loginEvent"));
        navigate("/");
      } else {
        alert('There was an error deleting your profile.');
      }
    }
  };

  return (
    <>
      <div className="profile-page">
        <div className="profile-image-and-links">
          {editMode ? (
              <img src={pfp || pfp_placeholder} alt="Profile" className="profile-pfp" />
            ) : (
              <img src={confirmedPfp || pfp_placeholder} alt="Profile" className="profile-pfp" />
            )}
        </div>
        <div className="profile-fields">
          <div className="profile-form">
            {editMode ? (
                <form onSubmit={handleSubmit}>
                  <h1>Edit Profile</h1>
                  <div className="profile-field">
                    <label htmlFor="pfp">Profile Picture URL: </label>
                    <input
                      type="text"
                      placeholder="Enter a new image address"
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
                  <div className="button-pair">
                    <button type="submit" className="small-button">Save Changes</button>
                    <button onClick={handleCancel} className="small-button">Cancel</button>
                    <button onClick={handleDeleteProfile} className="small-button delete-button">Delete Profile</button>
                  </div>
                </form>
              ) : (
                <div>
                  <>
                  <h1>Profile</h1>
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
                </div>
              )}
            <div>
              <button className="small-button">
                <Link to="/favourites" className="profile-link">
                  Go to Favorites
                </Link>
              </button>
              <LogoutButton handleLogout={handleLogout} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

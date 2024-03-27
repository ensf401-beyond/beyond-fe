import "../assets/App.css";
import darkLogo from "../assets/images/BEYOND Dark Mode.png";
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { useAuth } from "../contexts/AuthContext";
import StartPage from "../pages/StartPage/StartPage";
import pfp_placeholder from "../assets/images/pfp_placeholder.png";
import { getMappedData } from "../utils/starMapController";

/**
 * Layout Component
 *
 * This component acts as the main layout wrapper for the application, providing a consistent structure
 * that includes a header with a navigation bar and a content area for child components.
 *
 * Props:
 * - children: ReactNode - The content to be displayed within the main content area of the layout.
 *
 * State:
 * - starData (string): The JSON string representation of the star data retrieved from the API.
 * - isLoggedIn (string): The current login status of the user.
 * - name (string): The name of the user currently logged in.
 * - pfp (string): The profile picture URL of the user currently logged in.
 *
 * Functions:
 * - loadData: () => void - Loads the star data from the API and stores it in local storage.
 * - handleClick: (event: React.MouseEvent<HTMLParagraphElement>) => void - Handles click events on footer features.
 * - getInfo: () => void - Retrieves the user information from local storage.
 * 
 */
function Layout() {
  const [starData, setStarData] = useState(
    localStorage.getItem("starData") || ""
  );
  const nav = useNavigate();

  // Check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn")
  );

  const { isGuest, handleGuestUser } = useAuth();

  // Load star data into local storage
  const loadData = async () => {
    if (starData === "") {
      console.log("getting data");
      await getMappedData().then((data) => {
        localStorage.setItem("starData", JSON.stringify(data));
        setStarData(JSON.stringify(data));
      });
      window.location.reload();
    }
  };

  // Load user information from local storage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn"));
      setName(localStorage.getItem("Name") || "");
      setPfp(localStorage.getItem("PFP") || "");
    };

    window.addEventListener("storage", handleStorageChange); // This will catch changes in sessionStorage across tabs.
    window.addEventListener("loginEvent", handleStorageChange); // This will catch our custom login/logout events.

    loadData();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginEvent", handleStorageChange);
    };
  }, []);

  // Handle click events on footer features
  const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
    const path = event.currentTarget.getAttribute("data-path");
    if (path) {
      nav(path);
    }
  };

  const [name, setName] = useState<string>("");
  const [pfp, setPfp] = useState<string>("");

  // Get user information from local storage
  const getInfo = () => {
    setName(localStorage.getItem("Name") || "");
    setPfp(localStorage.getItem("PFP") || "");
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      {!isLoggedIn && !isGuest ? (
        <StartPage handleGuestUser={handleGuestUser} />
      ) : (
        <div className="app">
          <div id="header">
            <img
              id="logo"
              src={darkLogo}
              alt="logo"
              onClick={() => {
                nav("/");
              }}
            ></img>
            <Navbar />
            <div className="button-group">
              {isLoggedIn ? (
                <div id="profile">
                  <button
                    className="profile-button"
                    onClick={() => {
                      nav("/profile");
                    }}
                  >
                    <img
                      id="profile-pic"
                      src={pfp || pfp_placeholder}
                      alt="PFP"
                    />
                    <div className="profile-text">
                      <p id="profile-username">{name}</p>
                      <p id="profile-small">Profile</p>
                    </div>
                  </button>
                </div>
              ) : (
                <button
                  id="guest-login-button"
                  className="profile-button"
                  onClick={() => {
                    nav("/login");
                  }}
                >
                  Log In
                </button>
              )}
            </div>
          </div>
          <main>
            <Outlet />
          </main>
          <footer>
            <img id="footer-logo" src={darkLogo} alt="logo" />
            <p id="copyright-logo">&#169;</p>
            <div className="footer-features">
              Discover
              <p className="feature" onClick={handleClick} data-path="/">
                Home
              </p>
              <p
                className="feature"
                onClick={handleClick}
                data-path="/sky-objects"
              >
                Sky Objects
              </p>
              <p className="feature" onClick={handleClick} data-path="/sky-map">
                Sky Map
              </p>
              <p
                className="feature"
                onClick={handleClick}
                data-path="/favourites"
              >
                Favourites
              </p>
              <p
                className="feature"
                onClick={handleClick}
                data-path="/create"
              >
                Create
              </p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default Layout;

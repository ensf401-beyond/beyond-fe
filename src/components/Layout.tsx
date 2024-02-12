import "../assets/App.css";
import lightLogo from "../assets/images/BEYOND Light Mode.png";
import darkLogo from "../assets/images/BEYOND Dark Mode.png";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import React, { useState, createContext, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export const ThemeContext = createContext<ThemeContextType | null>(null);




type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

type LayoutProps = {
  children: ReactNode;
};



function Layout({ children }: LayoutProps) {
  const [theme, setTheme] = useState("dark");

  const nav = useNavigate();

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const [name, setName] = useState<string>("");
  const [pfp, setPfp] = useState<string>("");

  const getInfo = () => {
    setName(localStorage.getItem("Name") || "");
    setPfp(localStorage.getItem("PFP") || "");
  }


  useEffect(() => {
    getInfo();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme} className="app">
        <div id="header">
          <img
            id="logo"
            src={theme === "light" ? lightLogo : darkLogo}
            alt="logo"
            onClick={() => {
              nav("/");
            }}
          ></img>
          <div id="profile">
            <button
              className="profile-button"
              onClick={() => {
                nav("/profile");
              }}
            >
              <img
                id="profile-pic"
                src={pfp}
                alt="PFP"
                ></img>
              <div className="profile-text">
                <p id="profile-username">{name}</p>
                <p id="profile-small">Edit Profile</p>
              </div>
            </button>
          </div>
          <div id="theme-switch">
            <button className="mode-button" onClick={toggleTheme}>
              {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </button>
          </div>
        </div>
        <div className="main">
          <Navbar />
          <main id="content">{children}</main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default Layout;

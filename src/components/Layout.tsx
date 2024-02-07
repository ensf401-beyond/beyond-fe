import "../assets/App.css";
import lightLogo from "../assets/images/BEYOND Light Mode.png";
import darkLogo from "../assets/images/BEYOND Dark Mode.png";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import React, { useState, createContext, ReactNode } from "react";
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

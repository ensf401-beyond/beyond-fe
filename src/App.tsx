import "./assets/App.css";
import lightLogo from "./assets/images/BEYOND Light Mode.png";
import darkLogo from "./assets/images/BEYOND Dark Mode.png";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme} className="App">
        <div id="header">
          <img
            id="logo"
            src={theme === "light" ? lightLogo : darkLogo}
            alt="logo"
          ></img>
          <div id="themeSwitch">
            <button id="modeButton" onClick={toggleTheme}>
              {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </button>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

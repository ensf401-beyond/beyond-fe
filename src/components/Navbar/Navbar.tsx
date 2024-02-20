// Import statements for necessary hooks and components.
import { NavbarData } from "../../data/NavBarData"; // Data source for navbar items.
import { useNavigate, useLocation } from "react-router-dom"; // React Router hooks for navigation and location.
import NavbarButton from "../ui/NavbarButton/NavbarButton"; // Custom button component used in the navbar.
import "./Navbar.css";
/**
 * Type definition for individual items within the NavbarData array.
 *
 * @property {string} name - Display name for the navbar item.
 * @property {string} path - Path to which the application navigates when this item is clicked.
 */
type NavbarItem = {
  name: string;
  path: string;
};

/**
 * Navbar component that renders navigation buttons based on the NavbarData.
 *
 * Utilizes React Router's `useNavigate` for programmatically navigating to different
 * routes and `useLocation` to determine the current path for active link styling.
 */
function Navbar() {
  const navigate = useNavigate(); // Hook for programmatically navigating.
  const location = useLocation(); // Hook for accessing the current location/path.

  /**
   * Handles click events on navbar items, navigating to the specified path.
   *
   * @param {string} path - The path to navigate to upon clicking a navbar item.
   */
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <div id="navbar">
        <ul id="navbar-list">
          {/* Map through NavbarData to render NavbarButton components for each item. */}
          {NavbarData.map((val: NavbarItem, key: any) => (
            <li
              className="row"
              id={location.pathname === val.path ? "active" : ""} // Dynamically assigns an "active" ID if the path matches the current location.
              key={key} // React key for list items.
              onClick={() => handleNavigate(val.path)} // Click handler to navigate to the item's path.
            >
              <NavbarButton name={val.name} path={val.path} />{" "}
              {/* Render a button for the navbar item. */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Navbar;

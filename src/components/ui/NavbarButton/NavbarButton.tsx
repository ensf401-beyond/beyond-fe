// Importing the useNavigate hook from react-router-dom to enable navigation.
import { useNavigate } from "react-router-dom";
import "./NavbarButton.css";

/**
 * Type definition for the props accepted by the NavbarButton component.
 *
 * @property {string} name - The display name of the navbar button. This text is shown on the button.
 * @property {string} path - The navigation path that the button directs to when clicked.
 */
type NavbarItem = {
  name: string;
  path: string;
};

/**
 * NavbarButton Component
 *
 * Renders a button used in the navigation bar, facilitating routing to different parts of the application.
 * This component abstracts the button element that, when clicked, navigates to a specified route.
 *
 * Props:
 * - name: A string that represents the button's visible name.
 * - path: A string specifying the route path to navigate to upon the button's click.
 *
 * Behavior:
 * The component uses the `useNavigate` hook from react-router-dom for programmatically navigating to the specified path.
 */
function NavbarButton({ name, path }: NavbarItem) {
  const nav = useNavigate();

  return (
    <>
      <button
        className="navbar-button"
        onClick={() => {
          nav(path); // Navigating to the specified path when the button is clicked.
        }}
      >
        {name}
        {/**The buttons label*/}
      </button>
    </>
  );
}

export default NavbarButton;

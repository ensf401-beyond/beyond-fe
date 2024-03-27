import { useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';

/**
 * LogoutButton Component
 *
 * This component is in charge of controlling the UI for the logout button.
 *
 * Props:
 * - handleLogout: () => void - Function to handle the logout process.
 * 
 * Functions:
 * - onSuccess: () => void - Function to handle the logout process.
 *
 * The logout button allows users to log out of their account.
 *
 * @returns the view for the logout button
 */
function LogoutButton({ handleLogout }: any) {
  const navigate = useNavigate();

  // Function to handle the logout process
  const onSuccess = () => {
    console.log("Successfully Logged Out!");
    window.localStorage.setItem("Email", "");
    localStorage.removeItem("Favourites");
    sessionStorage.removeItem("isLoggedIn");
    handleLogout();
    window.dispatchEvent(new Event("loginEvent"));
    navigate("/");
  };

  return (
    <div className="flex-body">
      <button id="custom-btn" onClick={() => {
        googleLogout();
        onSuccess();
      }}>
        <span className="button-text">Log Out </span>
      </button>
    </div>
  );
}

export default LogoutButton;

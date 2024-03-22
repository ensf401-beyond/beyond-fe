import { useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';

function LogoutButton({ handleLogout }: any) {
  const navigate = useNavigate();

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

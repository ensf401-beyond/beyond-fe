import { useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';

function LogoutButton({ handleLogout }: any) {
  const navigate = useNavigate();

  const onSuccess = () => {
    console.log("Successfully Logged Out!");
    window.localStorage.setItem("Email", "");
    handleLogout();
    navigate("/");
  };

  return (
    <div className="flex-body">
      <button id="custom-btn" onClick={() => {
        googleLogout();
        onSuccess();
      }}>
        <span className="button-text">Log Out </span>
        <span className="googleIcon"></span>
      </button>
    </div>
  );
}

export default LogoutButton;

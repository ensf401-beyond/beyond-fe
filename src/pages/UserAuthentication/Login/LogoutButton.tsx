import { useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';

function LogoutButton({ handleLogout }: any) {
  const navigate = useNavigate();

  const onSuccess = () => {
    console.log("Successfully Logged Out!");
    handleLogout();
    navigate("/");
  };

  return (
    <div className="flex-body">
      <button id="customBtn" onClick={() => {
        googleLogout();
        onSuccess();
      }}>
        <span className="buttonText">Log Out </span>
        <span className="googleIcon"></span>
      </button>
    </div>
  );
}

export default LogoutButton;

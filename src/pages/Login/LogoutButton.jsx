import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

const clientID =
  "138234664993-d0mvhfhmbq2vh2877oq6ub1v6ie1hbj9.apps.googleusercontent.com";

function LogoutButton({ handleLogout }) {
  const navigate = useNavigate();
  const onSuccess = (response) => {
    console.log("Successfully Logged Out!");
    handleLogout();
    navigate("/");
  };

  return (
    <div id="signoutButton">
      <GoogleLogout
        clientId={clientID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default LogoutButton;

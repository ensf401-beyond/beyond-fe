import { GoogleLogout } from "react-google-login";

const clientID =
  "138234664993-d0mvhfhmbq2vh2877oq6ub1v6ie1hbj9.apps.googleusercontent.com";

function LogoutButton() {
  const onSuccess = (response) => {
    console.log("Successfully Logged Out!");
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

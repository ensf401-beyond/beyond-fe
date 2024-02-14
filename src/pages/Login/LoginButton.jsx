import { GoogleLogin } from "react-google-login";

const clientID =
  "138234664993-d0mvhfhmbq2vh2877oq6ub1v6ie1hbj9.apps.googleusercontent.com";

function LoginButton() {
  const onSuccess = (response) => {
    console.log("Successfully Logged In! Current User: ", response.profileObj);
    window.localStorage.setItem("Email", response.profileObj.email);
  };

  const onFailure = (response) => {
    console.log(
      "Login failed! Please try again (womp womp). Error: ",
      response
    );
  };

  return (
    <div id="signinButton">
      <GoogleLogin
        clientId={clientID}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default LoginButton;

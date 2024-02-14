import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";

import { useNavigate } from "react-router-dom";

interface LoginButtonProps {
  handleLogin: () => void;
}

interface GoogleLoginResponseError {
  error: string;
  details: string;
}

const clientID =
  "138234664993-d0mvhfhmbq2vh2877oq6ub1v6ie1hbj9.apps.googleusercontent.com";

function LoginButton({ handleLogin }: LoginButtonProps) {
  const navigate = useNavigate();
  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in response) {
      console.log(
        "Successfully Logged In! Current User: ",
        response.profileObj
      );
      window.localStorage.setItem("Email", response.profileObj.email);
      handleLogin();
      navigate("/");
    }
  };

  const onFailure = (response: GoogleLoginResponseError) => {
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

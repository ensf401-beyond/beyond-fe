import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { loginUser} from '../../../utils/userController';
import { userLoginData } from '../../../utils/dataClasses';
import { useNavigate } from "react-router-dom";

interface LoginButtonProps {
  handleLogin: () => void;
  setErrMessage: (errMessage : string) => void;
}

function LoginButton({ handleLogin, setErrMessage }: LoginButtonProps) {

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Successfully Logged In!', tokenResponse);

      const accessToken = tokenResponse.access_token;

      try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userProfile = res.data;
        localStorage.setItem("userData", JSON.stringify({
          email: userProfile.email,
          isGoogle: true,
          googleAccessToken: accessToken,
        }));
        window.localStorage.setItem("Email", userProfile.email);

        let userData : userLoginData = {
          email: userProfile.email,
          password: "google",
          isGoogle: true
        }

        const apiRes = await loginUser(userData, accessToken);
        // Prevent login if there's an erro
        if (apiRes["error"]) {
          if (apiRes["error"] == "not a user") {
            setErrMessage("Login invalid; Please register first!");
          } else {
            setErrMessage(apiRes["error"]);
          }
          return;
        }
        localStorage.setItem("Name", apiRes["username"] ? apiRes["username"] : userProfile.name);
        localStorage.setItem("PFP", apiRes["profilePic"] ? apiRes["profilePic"] : userProfile.picture);

        handleLogin();
        sessionStorage.setItem("isLoggedIn", 'true');
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    },
    onError: error => {
      console.log('Login failed! Please try again (womp womp). Error: ', error);
    }
  });

  return (
    <>
      <div className="flex-body">
        <button id="custom-btn" onClick={() => login()}>
          <span className="button-text">Sign in with Google </span>
          <span className="google-icon"></span>
        </button>
      </div>
    </>
  );
}

export default LoginButton;

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface LoginButtonProps {
  handleLogin: () => void;
}

function LoginButton({ handleLogin }: LoginButtonProps) {

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
        window.localStorage.setItem("Email", userProfile.email);
        handleLogin();
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

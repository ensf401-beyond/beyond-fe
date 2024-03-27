import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { userRegisterData } from '../../../utils/dataClasses';
import { registerUser } from '../../../utils/userController';

// LoginButtonProps is an interface that defines the props for the LoginButton component
interface LoginButtonProps {
  handleRegister: () => void;
}

/**
 * GoogleButton Component
 *
 * This component is in charge of controlling the UI for the Google registration button.
 *
 * Props:
 * - handleRegister: () => void - Function to handle the registration process.
 *
 * The Google registration button allows users to register using their Google account.
 *
 * @returns the view for the Google registration button
 */
function GoogleButton({ handleRegister }: LoginButtonProps) {

  const navigate = useNavigate();

  // Function to register using Google
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
        console.log("USER",  userProfile);
        const userData : userRegisterData = {
          firstName: userProfile.given_name,
          lastName: userProfile.family_name,
          username: userProfile.name,
          email: userProfile.email,
          password: "google",
          isGoogle: true
        }

        let apiRes = await registerUser(userData);

        if (apiRes["error"]) {
          console.log('Error with registration');
          return;
        }
        
        window.localStorage.setItem("Email", userProfile.email);
        window.localStorage.setItem("Name", userProfile.name);
        window.localStorage.setItem("PFP", userProfile.picture);

        handleRegister();
        navigate('/login');
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
          <span className="button-text">Register with Google </span>
          <span className="google-icon"></span>
        </button>
      </div>
    </>
  );
}

export default GoogleButton;

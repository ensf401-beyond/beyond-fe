import { useNavigate } from "react-router-dom";
import "./StartPage.css";

// StartPageProps is an interface that defines the props for the StartPage component
interface StartPageProps {
  handleGuestUser: () => void;
}

/**
 * StartPage Component
 *
 * This component is in charge of controlling the UI for the start page.
 * 
 * Props:
 * - handleGuestUser: () => void - Function to handle the guest user login.
 *
 * The start page consists of the main page of the website where users can
 * choose to login, register, or continue as a guest.
 *
 * @returns the view for the start page
 */
function StartPage({ handleGuestUser }: StartPageProps) {
  const nav = useNavigate();

  return (
    <div className="start-page-container">
      <div className="start-page-main">
        <h1 className="start-header">&#128640; Welcome to BEYOND &#128640;</h1>
        <div className="user-auth-buttons">
          <button className="home-auth-button" onClick={() => nav("/login")}>
            Login
          </button>
          <button className="home-auth-button" onClick={() => nav("/register")}>
            Register
          </button>
          <button
            className="home-auth-button"
            onClick={() => {
              handleGuestUser();
              nav("/");
            }}
          >
            Guest
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartPage;

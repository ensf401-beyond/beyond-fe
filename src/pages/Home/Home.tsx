import mars from "../../assets/images/mars.png";
import "./Home.css";

/**
 * Home Component
 *
 * This component is in charge of controlling the UI for the home page.
 *
 * The home page consists of information regarding the entire website
 * and providing users with a concise and accurate depiction of what to expect
 * from our web app.
 *
 * @returns the view for the main page of the website
 */
function Home() {
  return (
    <>
      <div className="page-container">
        <div className="first-page-container">
          <div className="text-container">
            <p className="home-text">
              Have you ever wondered what lies beyond?
            </p>
            <button className="home-button">Explore the Cosmos</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

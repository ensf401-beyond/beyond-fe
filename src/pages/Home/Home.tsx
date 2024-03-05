import mars from "../../assets/images/mars.png";
import galaxy from "../../assets/images/galaxy2.jpg";
import orion from "../../assets/images/orion.jpg";
import nebula from "../../assets/images/nebula.jpg";
import astronaut from "../../assets/images/astronaut.jpg";
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
      <div className="home-page-container">
        <section className="first-page-container">
          <div className="text-container">
            <p className="home-text">
              Have you ever wondered what lies beyond?
            </p>
            <button className="home-button">Explore the Cosmos</button>
          </div>
          <img alt="mars" src={mars} className="mars" />
        </section>
        <section className="section-container">
          <div id="left-column" className="home-grid-column">
            <p id="galaxy-title" className="image-title">
              Galaxies
            </p>
            <img src={galaxy} alt="galaxy" className="home-image" />
            <p id="galaxy-text" className="image-text">
              Discover what galaxies exist beyond such as the Milky Way, etc.
            </p>
          </div>
          <div id="middle-column" className="home-grid-column">
            <p id="nebula-title" className="image-title">
              Nebulae
            </p>
            <img src={nebula} alt="nebula" className="home-image" />
            <p id="nebula-text" className="image-text">
              Discover nebulae which are interstellar clouds of gas and dust.{" "}
            </p>
          </div>
          <div id="right-column" className="home-grid-column">
            <p id="stars-title" className="image-title">
              Stars
            </p>
            <img src={orion} alt="stars" className="home-image" />
            <p id="stars-text" className="image-text">
              Discover stars including some of your favourite constellations
              such as The Big Dipper and The Little Dipper
            </p>
          </div>
        </section>
        <section id="favourites-container" className="section-container">
          <img id="astronaut-image" src={astronaut} alt="favourites" />
          <div id="favourites-text-container">
            <p id="home-favourites-text">
              Save sky objects to favourites so you can always go back and check
              them out again!
            </p>
            <button id="favourites-nav-button" className="home-button">
              View Collection
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;

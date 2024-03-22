import mars from "../../assets/images/mars.png";
import galaxy from "../../assets/images/galaxy2.jpg";
import orion from "../../assets/images/orion.jpg";
import nebula from "../../assets/images/nebula.jpg";
import astronaut from "../../assets/images/astronaut.jpg";
import skyMap from "../../assets/images/sky-map.jpg";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect } from "react";
import { getFavourites } from "../../utils/favController";

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
  useEffect(() => {
    async function loadFavs() {
      if (!localStorage.hasOwnProperty('Favourites')) {
        const email = localStorage.getItem("Email") || '{}';
        if (email == '{}') {
          throw new Error("No email in localStorage");
        }
        const fav_res = await getFavourites(email);
        localStorage.setItem("Favourites", JSON.stringify(fav_res['favourites']));
      }
    }

    loadFavs();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="home-page-container">
        <section className="first-page-container">
          <div className="text-container">
            <p className="home-text">
              Have you ever wondered what lies beyond?
            </p>
            <button
              className="home-button"
              onClick={() => {
                navigate("/sky-objects");
              }}
            >
              Explore the Cosmos
            </button>
          </div>
          <img alt="mars" src={mars} className="mars" />
        </section>
        <section id="info-section" className="section-container">
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
        <section id="sky-map-section" className="section-container">
          <div id="sky-map-text-container" className="home-text-container">
            <p id="sky-map-text" className="home-section-text">
              Browse our sky map to see where each sky object resides including
              your favourite stars and galaxies
            </p>
            <button
              id="sky-map-nav-button"
              className="home-button"
              onClick={() => {
                navigate("/sky-map");
              }}
            >
              Browse Sky Map
            </button>
          </div>
          <img
            id="sky-map-image"
            className="section-image"
            src={skyMap}
            alt="sky map"
          />
        </section>
        <section id="favourites-section" className="section-container">
          <img
            id="astronaut-image"
            className="section-image"
            src={astronaut}
            alt="favourites"
          />
          <div id="favourites-text-container" className="home-text-container">
            <p id="home-favourites-text" className="home-section-text">
              Save sky objects to favourites so you can always go back and check
              them out again!
            </p>
            <button
              id="favourites-nav-button"
              className="home-button"
              onClick={() => {
                navigate("/favourites");
              }}
            >
              View Collection
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;

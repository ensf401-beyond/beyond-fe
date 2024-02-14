import mars from '../../assets/images/mars.png'

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
        <p className="home-text">Have you ever wondered what lies beyond?</p>
        <img
          alt="mars"
          src={mars}
        />
      </div>
    </>
  );
}

export default Home;

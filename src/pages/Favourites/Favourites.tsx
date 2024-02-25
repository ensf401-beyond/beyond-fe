import Grid from "../../components/Grid/Grid";

/**
 * Favourites Component
 *
 * This component is in charge of rendering the view for all 'favourited' sky objects in the data.
 * It manages the sky object data in the model and handles user input/interaction in the UI.
 *
 * @returns The view of all the 'favourited''sky objects
 */
function Favourites() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Stars</h1>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="search sky object"
            className="search-input"
          ></input>
        </div>
      </div>
      <Grid />
    </>
  );
}

export default Favourites;

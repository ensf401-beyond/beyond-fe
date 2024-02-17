import Grid from "../../components/Grid/Grid";

/**
 * Stars Component
 *
 * This component is in charge of rendering the view for all the sky objects in the data.
 * It manages the stars data in the model and handles user input/interaction in the UI.
 *
 * @returns The view of all the star sky objects
 */
function Stars() {
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

export default Stars;

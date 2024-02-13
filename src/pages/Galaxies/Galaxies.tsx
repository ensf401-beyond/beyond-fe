import Grid from "../../components/Grid";

/**
 * Galaxies Component
 *
 * This component is in charge of the UI for the galaxies page and handling user input/interaction
 *
 * @returns the grid view of all the galaxy sky objects in the data
 */
function Galaxies() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Galaxies</h1>
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

export default Galaxies;

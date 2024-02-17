import Grid from "../../components/Grid/Grid";

/**
 * Nebulae Component
 *
 * This component is in charge of rendering the view of all the nebulae sky objects.
 * It controls the view and manages the Nebulae data. Handles user input/interaction.
 *
 * @returns the view for all the nebulae sky objects
 */
function Nebulae() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Nebulae</h1>
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

export default Nebulae;

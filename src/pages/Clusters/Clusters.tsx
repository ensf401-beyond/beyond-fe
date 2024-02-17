import Grid from "../../components/Grid/Grid";

/**
 * Clusters Component
 *
 * This component is in charge of displaying a grid consisting of all the cluster sky objects
 *
 * @returns a display of all the sky objects that are a cluster(s)
 */
function Clusters() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Clusters</h1>
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

export default Clusters;

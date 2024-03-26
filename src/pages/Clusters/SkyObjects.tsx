import Grid from "../../components/Grid/Grid";

/**
 * Clusters Component
 *
 * This component is in charge of displaying a grid consisting of all the cluster sky objects
 *
 * @returns a display of all the sky objects that are a cluster(s)
 */
function SkyObjects() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Sky Objects</h1>
        <div className="search-bar-container"></div>
      </div>
      <Grid isFavPage={false} />
    </>
  );
}

export default SkyObjects;

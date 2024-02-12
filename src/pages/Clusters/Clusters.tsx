import Grid from "../../components/Grid";

function Clusters() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Clusters</h1>
        <div className="search-bar-container">
          <input type="text" placeholder="search sky object" className="search-input"></input>
        </div>
      </div>
      <Grid />
    </>
  );
}

export default Clusters;

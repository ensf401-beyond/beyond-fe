import Grid from "../../components/Grid";

function Stars() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Stars</h1>
        <div className="search-bar-container">
          <input type="text" placeholder="search sky object" className="search-input"></input>
        </div>
      </div>
      <Grid />
    </>
  );
}

export default Stars;

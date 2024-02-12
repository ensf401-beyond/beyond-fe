import Grid from "../../components/Grid";

function Galaxies() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Galaxies</h1>
        <div className="search-bar-container">
          <input type="text" placeholder="search sky object" className="search-input"></input>
        </div>
      </div>
      <Grid />
    </>
  );
}

export default Galaxies;

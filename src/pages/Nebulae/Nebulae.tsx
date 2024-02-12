import Grid from "../../components/Grid";

function Nebulae() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Nebulae</h1>
        <div className="search-bar-container">
          <input type="text" placeholder="search sky object" className="search-input"></input>
        </div>
      </div>
      <Grid />
    </>
  );
}

export default Nebulae;

import Grid from "../../components/Grid/Grid";
import "./Favorites.css";

/**
 * Favourites Component
 *
 * This component is in charge of rendering the view for all 'favourited' sky objects in the data.
 * It displays the grid of sky objects that have been marked as 'favourites'.
 *
 * @returns The view of all the 'favourited' sky objects
 */
function Favourites() {
  return (
    <>
      <h1 className="fav-header">Favourites</h1>
      <Grid isFavPage={true}/>
    </>
  );
}

export default Favourites;

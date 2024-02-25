import "./GridCard.css";
import { useState } from "react";

/**
 * Type definition for the properties accepted by the GridCard component.
 * These properties define the content displayed for each sky object in the grid.
 *
 * @property {string} name - The name of the sky object to be displayed on the card.
 * @property {string} image - The URL of the image representing the sky object.
 */
type GridItem = {
  name: string;
  image: string;
};

/**
 * GridCard Component
 *
 * This component renders a single card within a grid that displays information
 * about a sky object, including its name, an image, and a default description.
 *
 * Props:
 * - name: The name of the sky object.
 * - image: URL to the image of the sky object.
 * 
 * State:
 * - fav: boolean - Tracks the current favourite status (true/false) and adjusts the star icon accordingly.
 *
 * Functions:
 * - toggleFav: () => void - Toggles the theme between true and false.
 *
 * Usage:
 * This component is designed to be used within a grid layout where multiple instances
 * are rendered to display a variety of sky objects. It accepts the `name` and `image` props
 * to customize the information presented for each sky object.
 */
function GridCard({ name, image }: GridItem) {
  const [fav, setFav] = useState(false);  // fav = favourite

  // Toggles the current favourite state.
  const toggleFav = () => {
    setFav((curr) => (curr === true ? false : true));
  };

  return (
    <div className="grid-card">
      <img className="sky-object-image" src={image} alt={name}></img>
      <div className="grid-card-text">
        <p className="sky-object-name">{name}</p>
        <p className="sky-object-description">Click to view more!</p>
        <span className="fav-button" onClick={toggleFav}>
          {/* \u2606 is open star icon, \u2605 is closed star icon*/}
          {fav === false ? '\u2606' : '\u2605'}  
        </span>
      </div>
      
    </div>
  );
}

export default GridCard;

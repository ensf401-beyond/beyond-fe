// Import statements to include necessary data and components.
import { DummyData } from "../../data/DummyData"; // Importing the dataset that contains information about sky objects.
import GridCard from "../ui/GridCard/GridCard"; // Importing the GridCard component used to display each sky object.
import "./Grid.css";
import { useState } from "react";
/**
 * Type definition for items within the DummyData array representing sky objects.
 *
 * @property {string} name - The name of the sky object (e.g., "Andromeda Galaxy").
 * @property {string} image - The URL to an image of the sky object.
 */
type GridItem = {
  name: string;
  image: string;
};

/**
 * Grid component that renders a collection of sky objects as a grid.
 *
 * Utilizes data from DummyData to create a grid of GridCard components,
 * each representing a different sky object with a name and an image.
 */
function Grid() {
  const [overlayInfo, setOverlayInfo] = useState({ isVisible: false, name: "", image: "" });

  return (
    <>
      {overlayInfo.isVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>{overlayInfo.name}</h3>
            <p>More information about the sky object...</p>
            <button onClick={() => setOverlayInfo({ ...overlayInfo, isVisible: false })}>Close</button>
          </div>
        </div>
      )}
      <div id="grid-container">
        {/* Mapping over DummyData to render a GridCard for each sky object. */}
        {DummyData.map((val: GridItem, key: number) => (
          <GridCard
            key={key} // Providing a unique key for each child in the list.
            name={val.name} // Passing the name of the sky object to the GridCard.
            image={val.image} // Passing the image URL of the sky object to the GridCard.
            onCardClick={() => setOverlayInfo({ isVisible: true, name: val.name, image: val.image })} // Passing a function to handle the click event on the GridCard.
          />
        ))}
      </div>
    </>
  );
}

export default Grid;

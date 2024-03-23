// Import statements to include necessary data and components.
import { DummyData } from "../../data/DummyData"; // Importing the dataset that contains information about sky objects.
import GridCard from "../ui/GridCard/GridCard"; // Importing the GridCard component used to display each sky object.
import "./Grid.css";
import { useEffect, useState } from "react";
import { addFavourite, deleteFavourite } from "../../utils/favController";

/**
 * Defines the structure of each sky object item.
 * @typedef {Object} GridItem
 * @property {string} name - The name of the sky object (e.g., "Andromeda Galaxy").
 * @property {string} image - The URL to an image representing the sky object.
 * @property {boolean} fav - Indicates whether the sky object is marked as a favorite.
 */

/**
 * Grid component that renders a collection of sky objects as a grid.
 *
 * State:
 * - data (Array of {name: string, image: string, fav: boolean}): Holds the list of sky object data, each with a name, image URL, and favorite status.
 * - overlayInfo ({isVisible: boolean, name: string, image: string, fav: boolean}): Manages the visibility of the overlay and information about the currently selected sky object.
 *
 * Functions:
 * - toggleFav: (name: string) => void - Toggles the theme between true and false.
 * - overlayInfo if the changed item is currently displayed in the overlay.
 * - setOverlayInfo({ isVisible, name, image, fav }): Sets the information to be displayed in the overlay, including visibility, name, image, and favorite status of the sky object.
 * 
 * @returns {void}
 *
 * Utilizes data from DummyData to create a grid of GridCard components,
 * each representing a different sky object with a name and an image.
 */
function Grid() {
  const [favArray, setfavArray] = useState(JSON.parse(localStorage.getItem('Favourites') || '[]'));
  const [data, setData] = useState(DummyData.map(item => ({ ...item, fav: favArray.includes(item.ngc) ? true : false })));
  const [overlayInfo, setOverlayInfo] = useState({ isVisible: false, name: "", image: "", ngc: 0, fav: false });

  useEffect(() => {
    updateLocalStorage(); // This will be executed when the state changes
  }, [favArray]);
  
  function updateLocalStorage() {
    localStorage.setItem('Favourites', JSON.stringify(favArray));
  }

  // 'name' is the item name
  const toggleFav = async (name: string, ngc: number) => {
    const email = localStorage.getItem("Email") || '{}';
    if (email == '{}') {
      throw new Error("No email in localStorage");
    }

    if (!(favArray.includes(ngc))) {   // Add ngc to the favourite array
      setfavArray( [ ...favArray, ngc  ] );
      const status = await addFavourite(email, ngc);
      console.log(status);
    } else {    // Remove ngc from the favourite array
      setfavArray( favArray.filter((element: number) => element !== ngc) );
      const status = await deleteFavourite(email, ngc);
      console.log(status);
    }

    setData(prevData =>
      prevData.map(item => ({
        ...item,
        fav: favArray.includes(item.ngc) ? true : false
      }))
    );
    setOverlayInfo({ ...overlayInfo, fav: favArray.includes(ngc) ? true : false });
  }

  return (
    <>
      {overlayInfo.isVisible && (
        <div className="overlay" onClick={() => setOverlayInfo({ ...overlayInfo, isVisible: false })}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>  {/* Stop overlay from closing when clicking inside */}
            <img className="sky-object-overlay-image" src={overlayInfo.image} alt={overlayInfo.name}></img>
            <div className="grid-card-text">
              <h3 className="sky-object-name">{overlayInfo.name}</h3>
              <p className="sky-object-description">More information about the sky object...</p>
              <span className="fav-button" onClick={(e) => { 
                  e.stopPropagation(); // Prevent overlay from closing
                  toggleFav(overlayInfo.name, overlayInfo.ngc); 
              }}>
                {overlayInfo.fav ? '\u2606' : '\u2605'} 
              </span>
            </div>
            <button className="overlay-button" onClick={(e) => { 
                e.stopPropagation(); // Prevent overlay from closing
                setOverlayInfo({ ...overlayInfo, isVisible: false }); 
            }}>Close</button>
          </div>
        </div>
      )}
      <div id="grid-container">
        {/* Mapping over DummyData to render a GridCard for each sky object. */}
        {data.map((item, index) => (
          <GridCard
            key={index}
            name={item.name}
            image={item.image}
            fav={ favArray.includes(item.ngc) ? true : false }
            onToggleFav={() => toggleFav(item.name, item.ngc)}
            onCardClick={() => setOverlayInfo({ ...item, isVisible: true })}
          />
        ))}
      </div>
    </>
  );
}

export default Grid;

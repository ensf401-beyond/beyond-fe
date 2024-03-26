// Import statements to include necessary data and components.
import GridCard from "../ui/GridCard/GridCard"; // Importing the GridCard component used to display each sky object.
import "./Grid.css";
import { useEffect, useState } from "react";
import { addFavourite, deleteFavourite } from "../../utils/favController";
import { useNavigate } from "react-router-dom";


/**
 * Defines the structure of each sky object item.
 * @typedef {Object} GridItem
 * @property {string} name - The name of the sky object (e.g., "Andromeda Galaxy").
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
function Grid({ isFavPage = false}) {
  const [favArray, setfavArray] = useState(JSON.parse(localStorage.getItem('Favourites') || '[]'));

  const getRandomImage = () => {
    const starImages = require('./starImages.json');
    const randomIndex = Math.floor(Math.random() * starImages.length);
    const randomImage = starImages[randomIndex].url;
    return randomImage;
  }

  const addImages = (data: any) => {
    return data.map((item: any) => {
      let url = getRandomImage();
      return { ...item, image: url};
    });
  }
  const [data, setData] = useState(addImages(JSON.parse(localStorage.getItem('starData') || '[]')));
  const [overlayInfo, setOverlayInfo] = useState({ isVisible: false, name: "", image: "", ngc: 0, fav: false });

  const [filteredData, setFilteredData] = useState(data);
  const nav = useNavigate();

  useEffect(() => {
    updateLocalStorage(); // This will be executed when the state changes
  }, [favArray]);
  
  function updateLocalStorage() {
    localStorage.setItem('Favourites', JSON.stringify(favArray));
  }

  useEffect(() => {
    search();
  }, []);

  // 'name' is the item name
  const toggleFav = async (name: string, ngc: number) => {
    const email = localStorage.getItem("Email") || '{}';
    if (email == '{}') {
      throw new Error("No email in localStorage");
    }
    setOverlayInfo({ ...overlayInfo, fav: !overlayInfo.fav });

    if (!(favArray.includes(ngc))) {   // Add ngc to the favourite array
      setfavArray( [ ...favArray, ngc  ] );
      const status = await addFavourite(email, ngc);
      console.log(status);
    } else {    // Remove ngc from the favourite array
      setfavArray( favArray.filter((element: number) => element !== ngc) );
      const status = await deleteFavourite(email, ngc);
      console.log(status);
    }

    setData((prevData: []) =>
      prevData.map((item: { name: string, image: string, ngc: number, fav: boolean }) => ({
        ...item,
        fav: favArray.includes(item.ngc) ? true : false
      }))
    );
  }

  
  const search = () => {
    const ngc = (document.getElementById('ngc') as HTMLInputElement).value || '';
    const constellation = (document.getElementById('constellation') as HTMLInputElement).value;
    const minMag = parseFloat((document.getElementById('minmagnitude') as HTMLInputElement).value);
    const maxMag = parseFloat((document.getElementById('maxmagnitude') as HTMLInputElement).value);
    const filteredData = data.filter((item: any) => {

      if (isFavPage && !favArray.includes(item.ngc)) return false;

      return (ngc === '' || item.ngc == ngc) &&  
             (constellation === '' || item.constellation.toLowerCase().includes(constellation.toLowerCase())) &&
             (isNaN(minMag) || item.magnitude >= minMag) &&
             (isNaN(maxMag) || item.magnitude <= maxMag);
    });

    setFilteredData(filteredData);
  }

  const routeToObject = (ngc: number) => {
    nav(`/object/${ngc}`);
  }

  return (
    <>
      <div className="search-bar">
        <label htmlFor="ngc">NGC:</label>
        <input type="text" id="ngc" name="ngc" />

        <label htmlFor="magnitude">Max Magnitude:</label>
        <input type="number" id="maxmagnitude" name="magnitude" step={0.1}/>

        <label htmlFor="magnitude">Min Magnitude:</label>
        <input type="number" id="minmagnitude" name="magnitude" step={0.1}/>

        <label htmlFor="constellation">Constellation:</label>
        <input type="text" id="constellation" name="constellation" />

        <div>
        <button type="submit" onClick={search}>Search</button>
        <button type="reset" onClick={() => setFilteredData(data)}>Reset</button>
        </div>
      </div>
      {overlayInfo.isVisible && (
        <div className="overlay" onClick={() => setOverlayInfo({ ...overlayInfo, isVisible: false, fav: favArray.includes(overlayInfo.ngc) })}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>  {/* Stop overlay from closing when clicking inside */}
            <div className="grid-card-text">
              <h3 className="object-route" onClick={() => routeToObject(overlayInfo.ngc)}>Go to Object Page</h3>
              <p className="sky-object-description">NGC: {overlayInfo.ngc}</p>
              <span className="fav-button" onClick={(e) => { 
                  e.stopPropagation(); // Prevent overlay from closing
                  toggleFav(overlayInfo.name, overlayInfo.ngc); 
              }}>
                {overlayInfo.fav ? '\u2605' : '\u2606'} 
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
        {filteredData.map((item: any, index: number) => (
          <GridCard
            key={index}
            name={item.ngc}
            constellation={item.constellation}
            mag = {item.magnitude}
            image={item.image}
            fav={ favArray.includes(item.ngc) ? true : false }
            onToggleFav={() => toggleFav(item.name, item.ngc)}
            onCardClick={() => setOverlayInfo({ ...item, isVisible: true, fav: favArray.includes(item.ngc) ? true : false })}
          />
        ))}
      </div>
    </>
  );
}

export default Grid;

import "./GridCard.css";
import { useState } from "react";

/**
 * Type definition for the properties accepted by the GridCard component.
 * These properties define the content displayed for each sky object in the grid.
 *
 * @property {string} name - The name of the sky object to be displayed on the card.
 * @property {string} mag - The magnitude of the sky object to be displayed on the card.
 * @property {string} constellation - The constellation of the sky object to be displayed on the card.
 * @property {string} image - The URL of the image representing the sky object.
 * @property {boolean} fav - Indicates whether the sky object is marked as a favorite.
 */
type GridItem = {
  name: string;
  mag: string;
  constellation: string;
  image: string;
  fav: boolean;
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
 * - fav (boolean): The current favorite status of the sky object.
 * - onToggleFav (() => void): Function to toggle the favorite status of the sky object.
 * - onCardClick (() => void): Function to handle the click event on the grid card, 
 *   typically used to display the overlay with more information.
 * 
 * Usage:
 * This component is designed to be used within a grid layout where multiple instances
 * are rendered to display a variety of sky objects. It accepts the name, image, and 
 * fav props to customize the information presented for each sky object. 
 * The onToggleFav and onCardClick props are functions provided by the parent component 
 * (Grid) to handle user interactions.
 */
function GridCard({ name, image, fav, mag, constellation, onToggleFav, onCardClick }: GridItem & { onCardClick: () => void, onToggleFav: () => void; }) {

  return (
    <div className="grid-card" onClick={() => onCardClick()}>
      <img className="sky-object-image" src={image} alt={name}></img>
      <div className="grid-card-text">
        <p className="sky-object-name">{name}</p>
        <p className="sky-object-name"><span>M: {mag}</span>&nbsp;&nbsp;&nbsp;<span>C: {constellation}</span> </p>
        <span className="fav-button" onClick={(e) => { e.stopPropagation(); onToggleFav(); }}>
          {/* \u2605 is closed star icon, \u2606 is open star icon */}
          {fav ? '\u2605' : '\u2606'} 
        </span>
      </div>
      
    </div>
  );
}

export default GridCard;

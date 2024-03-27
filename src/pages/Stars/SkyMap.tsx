import "./SkyMap.css";
import React, { useEffect, useRef, useState } from "react";
import { getMappedData } from "../../utils/starMapController";
import { useNavigate } from "react-router-dom";

/**
 * SkyMap Component
 *
 * This component displays a sky map with stars and constellations.
 * Users can click on stars to view more details about them.
 *
 * State:
 * - starData (string): The JSON string representation of the star data retrieved from the API.
 * - chosenObject (string): The name of the selected star object.
 * - chosenNGC (string): The NGC code of the selected star object.
 * - constellations (string[]): The list of constellations present in the star data.
 *
 * Functions:
 * - getConstellations: () => string[] - Retrieves the list of constellations from the star data.
 * - redraw: () => void - Redraws the sky map with updated star data.
 * - openFullscreen: () => void - Opens the sky map in fullscreen mode.
 * - navToPage: () => void - Navigates to the object page for the selected star object.
 *
 * @returns the view for the sky map page
 */
function SkyMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [starData, setStarData] = useState(localStorage.getItem("starData") || "");
  const [chosenObject, setChosenObject] = useState("");
  const [chosenNGC, setChosenNGC] = useState("");
  const nav = useNavigate();

  // Function to retrieve the list of constellations from the star data
  let getConstellations = () => {
    if (starData === "") return ["None"];
    let temp = ["None"] as any[];
    JSON.parse(starData).forEach((star: any) => {
      if (temp.indexOf(star.constellation) === -1) {
        temp.push(star.constellation);
      }
    });
    return temp;
  }
  const [constellations, setConstellations] = useState(getConstellations());

  // Function to redraw the sky map with updated star data
  let redraw = async () => {
    console.log('redrawing');

    if(starData === "") {
      console.log('getting data');
      await getMappedData().then((data) => {
        localStorage.setItem("starData", JSON.stringify(data));
        setStarData(JSON.stringify(data));
      });
      window.location.reload();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const viewWidth = document.documentElement.clientWidth;
    const viewHeight = document.documentElement.clientHeight;

    // Set actual size in memory (scaled to account for extra pixel density).
    var scale = window.devicePixelRatio; // <--- Change to 1 on retina screens to see blurry canvas.
    canvas.width = viewWidth * scale;
    canvas.height = viewHeight * scale;

    // Normalize coordinate system to use css pixels.
    context.scale(scale, scale);
    
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';

    // Draw stars
    while (starData === "") {
      await new Promise(r => setTimeout(r, 1000));
    }
    let objects = JSON.parse(starData);

    let selectedCon = document.getElementById("selectedCon") as HTMLSelectElement;
    let selected = "";
    try{
      selected = selectedCon.options[selectedCon.selectedIndex].value;
    } catch {
      selected = "";
    }

    objects.forEach((star: any) => {
      
      let temp = constellations
      if (star.constellation) {
        if (temp.indexOf(star.constellation) === -1) {
          temp.push(star.constellation);
          setConstellations(temp);
        }
      }
      context.beginPath();
      star.dec = - (star.dec / 125) * context.canvas.height + context.canvas.height / 2 + 180;

      star.ra = (star.ra / 360) * context.canvas.width;
      let mag = (Math.abs(star.magnitude)/ 5);
      mag += 0.5;
      if (star.constellation === selected || chosenNGC === star.ngc) {
        context.fillStyle = 'yellow';
        mag += 1;
      } else {
        context.fillStyle = 'white';
      }
      context.arc(star.ra, star.dec, mag, 0, 2 * Math.PI);
      context.fill();
    })

    // Draw constellations
    canvas.addEventListener('mousedown', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log(`Clicked at (${x}, ${y})`);
      let closest : string = "";
      let closestNGC : string = "";
      let closestDist = 100000;
      objects.forEach((star: any) => {
        if (Math.sqrt((star.ra - x) ** 2 + (star.dec - y) ** 2) < closestDist) {
          closest = star.name;
          closestDist = Math.sqrt((star.ra - x) ** 2 + (star.dec - y) ** 2);
          closestNGC = star.ngc;
        }
      });
      setChosenObject(closest);
      setChosenNGC(closestNGC);
    });
    
  }

  useEffect(() => {
    redraw();
  }, []);

  useEffect(() => {
    redraw();
  }, [starData]);

  // Function to open the sky map in fullscreen mode
  function openFullscreen() {
    let elem = document.getElementById("skyMap");
    if (!elem) return;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }

  // Function to navigate to the object page for the selected star object
  const navToPage = () => {
    nav(`/object/${chosenNGC}`);
  }

  return (
    <>
      <div>
        <div className="map-header">
          <div className="element">
            <span>Constellation: </span>
            <select id="selectedCon" onChange={redraw}>
              {constellations.map((constellation) => {
                return <option value={constellation}>{constellation}</option>;
              })}
            </select>
          </div>
          <p className="element">
            <span>NGC: </span>
            {chosenNGC}
          </p>
          {chosenObject === "" ? (
            <><span></span></>
          ) : (
            <div onClick={navToPage} className="button">
              Go To Object Page
            </div>
          )}
          <div onClick={openFullscreen} className="button">
            Fullscreen
          </div>
        </div>

        <canvas id="skyMap" ref={canvasRef}></canvas>
      </div>
    </>
  );
}

export default SkyMap;

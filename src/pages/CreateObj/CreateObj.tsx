import { FormEvent, useState } from "react";
import "./CreateObj.css";
import { objectData } from "../../utils/dataClasses";
import { addObject } from "../../utils/creationController";

/**
 * CreateObj Component
 *
 * This component provides a form for users to create a new sky object.
 * The form includes fields for the object's name, type, magnitude, constellation,
 * right ascension (RA), declination (DEC), collection, and NGC number.
 * 
 * State:
 * - name (string): The name of the sky object.
 * - type (string): The type of the sky object.
 * - mag (string): The magnitude of the sky object.
 * - constellation (string): The constellation of the sky object.
 * - RA (string): The right ascension of the sky object.
 * - DEC (string): The declination of the sky object.
 * - collection (string): The collection to which the sky object belongs.
 * - ngc (string): The NGC number of the sky object.
 * 
 * Functions:
 * - sub: (e: FormEvent<HTMLFormElement>) => void - Submits the form data to create a new sky object.
 * 
 * Usage:
 * This component is used to allow users to create new sky objects by entering the
 * required information into the form fields.
 *
 * @returns {JSX.Element}
 * - Returns a form for users to create a new sky object.
 */
function CreateObj() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [mag, setMag] = useState("");
    const [constellation, setConstellation] = useState("");
    const [RA, setRA] = useState("");
    const [DEC, setDEC] = useState("");
    const [collection, setCollection] = useState("");
    const [ngc, setNGC] = useState("");

    // Function to submit the form data to create a new sky object
    const sub = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let obj : objectData = {
        ngc: parseInt(ngc),
        name: name,
        type: type,
        constellation: constellation,
        ra: parseFloat(RA),
        dec: parseFloat(DEC),
        magnitude: parseFloat(mag),
        collection: collection
      }

      let apiRes = await addObject(obj);

        if (apiRes["error"]) {
          console.log('Error with creation');
          return;
        }
    }
    
  return (
    <>
      <div className="creating-form">
      <h1 className="page-title">Create an Object</h1>
        <form onSubmit={(e) => {sub(e)}} className="obj-form">
          <label>
            Name:
          </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>

          <label>
            Type:
          </label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="">Select a type</option>
                <option value="Star">Star</option>
                <option value="Galaxy">Galaxy</option>
                <option value="Nebula">Nebula</option>
                <option value="Cluster">Cluster</option>
            </select>
          <label>
            Magnitude:
          </label>
          <input type="number" value={mag} onChange={(e) => setMag(e.target.value)} required step={0.1}/>
          <label>
            Constellation:
          </label>
          <input type="text" value={constellation} onChange={(e) => setConstellation(e.target.value)} required/>
          <label>
            RA:
          </label>
          <input type="number" value={RA} onChange={(e) => setRA(e.target.value)} required step={0.1}/>
          <label>
            DEC:
          </label>
          <input type="number" value={DEC} onChange={(e) => setDEC(e.target.value)} required step={0.1}/>
          <label>
            Collection:
          </label>
          <input type="text" value={collection} onChange={(e) => setCollection(e.target.value)} required/>
          <label>
            NGC:
          </label>
          <input type="number" value={ngc} onChange={(e) => setNGC(e.target.value)} required step={1}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default CreateObj;

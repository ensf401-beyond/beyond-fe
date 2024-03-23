import { useState } from "react";
import "./CreateObj.css";

function CreateObj() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [mag, setMag] = useState("");
    const [constellation, setConstellation] = useState("");
    const [RA, setRA] = useState("");
    const [DEC, setDEC] = useState("");
    const [collection, setCollection] = useState("");
    const [ngc, setNGC] = useState("");

    
  return (
    <>
      <div className="creating-form">
        
      </div>
    </>
  );
}

export default CreateObj;
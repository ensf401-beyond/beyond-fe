import React, { useEffect, useState } from 'react';
import { getObjectData } from '../../utils/starMapController';
import { objectData } from '../../utils/dataClasses';

import { useParams } from 'react-router-dom';
import './ObjectPage.css';
import icon from '../../assets/images/google-icon.png';

/**
 * ObjectPage Component
 *
 * This component displays detailed information about a specific sky object.
 * The information includes the object's name, collection, constellation, declination, right ascension,
 * magnitude, type, and NGC code.
 *
 * State:
 * - object (objectData): The detailed information about the sky object.
 *
 * Functions:
 * - getData: () => void - Fetches the detailed information about the sky object.
 * - routeToGoogle: () => void - Opens a new tab with a Google search for the sky object.
 *
 * @returns the view for the detailed information page of a sky object
 */
function ObjectPage(){
    const { id } = useParams();
    const [object, setObject] = useState({} as objectData);

    // Function to fetch the detailed information about the sky object
    let getData = async () => {
        setObject(await getObjectData(id || ""));
    }

    useEffect(() => {
        getData();
    }, []);

    // Function to open a new tab with a Google search for the sky object
    const routeToGoogle = () => {
        window.open(`https://www.google.com/search?q=${object.name + " " + object.type}`);
    }

    return (
        <>
            <div className='info-wrapper'>
                <p className='info'><span className='info-label'>Name: </span>&nbsp;{object.name}</p>
                <p className='info'><span className='info-label'>Collection: </span>&nbsp;{object.collection}</p>
                <p className='info'><span className='info-label'>Constellation: </span>&nbsp;{object.constellation}</p>
                <p className='info'><span className='info-label'>Declenation: </span>&nbsp;{object.dec}</p>
                <p className='info'><span className='info-label'>RA: </span>&nbsp;{object.ra}</p>
                <p className='info'><span className='info-label'>Magnitude: </span>&nbsp;{object.magnitude}</p>
                <p className='info'><span className='info-label'>Type: </span>&nbsp;{object.type}</p>
                <p className='info'><span className='info-label'>NGC Code: </span>&nbsp;{object.ngc}</p>
                <div onClick={routeToGoogle} className='button'>Google Object<span><img src={icon} alt="" className='icon'></img></span></div>
            </div>
        </>
    );
}
export default ObjectPage;

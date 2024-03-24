import { objectData } from "./dataClasses";

function addObject(newObject: objectData) {
    console.log(newObject);
    let obj = {
        ngc: newObject.ngc.toString(),
        name: newObject.name,
        type: newObject.type,
        constellation: newObject.constellation,
        ra: newObject.ra.toString(),
        dec: newObject.dec.toString(),
        magnitude: newObject.magnitude.toString(),
        collection: newObject.collection
    }

    return fetch("https://zvtie25e7vgrsigaj4rn2a6nbi0uytkj.lambda-url.ca-central-1.on.aws/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error("Error adding object:", error);
            throw error;
        });
}

export { addObject };
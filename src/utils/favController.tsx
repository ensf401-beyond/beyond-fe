// This file contains the functions that interact with the AWS Lambda functions for the favourites

// Function to get the favourites from the database
function getFavourites(email : string) : Promise<any> {
    console.log('getting favourites');

    return fetch(`https://tceb7glsug2n67ra3wggoygy7e0mqdjn.lambda-url.ca-central-1.on.aws/?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // return the data
            return data;
        })
        .catch(error => {
            console.error(error);
            // handle any errors
            throw error;
        });
}

// Function to add a favourite to the database
function addFavourite(email : string, ngc : number) : Promise<any> {
    console.log('adding favourite');

    var requestBody =  JSON.stringify({ email: email, ngc: ngc });


    return fetch(`https://imolyxerm4cc73s75gdxrgvsru0dbvzn.lambda-url.ca-central-1.on.aws/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(async response => {
            console.log(await response.json());
            return response.status;
        })
        .catch(error => {
            console.error(error);
            // handle any errors
            throw error;
        });
}

// Function to delete a favourite from the database
function deleteFavourite(email : string, ngc : number) : Promise<any> {
    console.log('deleting favourite');

    return fetch(`https://log7pdtoidp72cwxjkvdxqrou40sqita.lambda-url.ca-central-1.on.aws/?email=${email}&ngc=${ngc}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(async response => {
            console.log(await response.json());
            return response.status;
        })
        .catch(error => {
            console.error(error);
            // handle any errors
            throw error;
        });
}
 
export { getFavourites, addFavourite, deleteFavourite };
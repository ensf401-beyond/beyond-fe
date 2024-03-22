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

// 
// https://log7pdtoidp72cwxjkvdxqrou40sqita.lambda-url.ca-central-1.on.aws/
// (takes in  email and ngc as query parameters, uses http DELETE method, returns status 200 and "Favourite deleted successfully" if successful.)

export { getFavourites, addFavourite };
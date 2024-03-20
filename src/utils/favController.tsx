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

export { getFavourites };
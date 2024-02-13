
function getUsername(email : string) : Promise<string> {
    return fetch('https://isl4icmfc4z46f2f5axpgnjyze0ozrdh.lambda-url.ca-central-1.on.aws/?email=' + email)
        .then(response => response.json())
        .then(data => data[0].username);    
}

export { getUsername };
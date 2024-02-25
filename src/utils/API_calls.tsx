import { userRegisterData } from './dataClasses';

function getUsername(email : string) : Promise<string> {
    return fetch('https://isl4icmfc4z46f2f5axpgnjyze0ozrdh.lambda-url.ca-central-1.on.aws/?email=' + email)
        .then(response => response.json())
        .then(data => data[0].username);    
}

function registerUser(userData: userRegisterData) : Promise<string> {
    return fetch('https://cspsnhiigruogk5qccctcusfwq0xkzfa.lambda-url.ca-central-1.on.aws/?email=' + userData.email + '&username=' + userData.username)
        .then(response => response.json())
        .then(data => data[0]);
}

export { getUsername, registerUser };
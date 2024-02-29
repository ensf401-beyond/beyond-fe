import { userRegisterData, userLoginData } from './dataClasses';

function loginUser(data : userLoginData) : Promise<string> {

    // takes in a userLoginData object and returns a promise of a string, either the username or 'not a user'
    return fetch('https://isl4icmfc4z46f2f5axpgnjyze0ozrdh.lambda-url.ca-central-1.on.aws', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    
    })
        .then(response => response.json())
        .then(data => data[0].username);    
}

function registerUser(userData: userRegisterData) : Promise<string> {

    // takes in a userRegisterData object and returns a promise of a string, either 'user created' or 'user exists'
    return fetch('https://cspsnhiigruogk5qccctcusfwq0xkzfa.lambda-url.ca-central-1.on.aws', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    
    })
        .then(response => response.json())
        .then(data => data[0]);
}

export { loginUser, registerUser };
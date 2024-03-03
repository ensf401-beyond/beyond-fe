import { userRegisterData, userLoginData } from './dataClasses';

function loginUser(data : userLoginData) : Promise<string> {


    console.log(data);
    console.log('login');

    return fetch('https://isl4icmfc4z46f2f5axpgnjyze0ozrdh.lambda-url.ca-central-1.on.aws/?email=' + data.email + '&password=' + data.password)
        .then(response => response.json())
        .then(data => data[0].username);    
}

function registerUser(userData: userRegisterData) : Promise<string> {

    console.log(userData);
    console.log('register');


    return fetch('https://cspsnhiigruogk5qccctcusfwq0xkzfa.lambda-url.ca-central-1.on.aws/?email=' + userData.email + '&username=' + userData.username)
        .then(response => response.json())
        .then(data => data[0]);
}

export { loginUser, registerUser };
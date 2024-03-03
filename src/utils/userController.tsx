import { userRegisterData, userLoginData } from './dataClasses';

function loginUser(data : userLoginData) : Promise<any> {


    console.log(data);
    console.log('login');

        return fetch(`https://mtzozkro4lldxudald2pa5gti40yufxq.lambda-url.ca-central-1.on.aws/?email=${data.email}&password=${data.password}&isGoogle=${data.isGoogle}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Process the response data
                console.log(data);
                return data;
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
                throw error;
            });
}

function registerUser(userData: userRegisterData) : Promise<any> {

    console.log(userData);
    console.log('register');


    return fetch('https://f4t2beecot3ujq6hwv7pveczzq0nqocq.lambda-url.ca-central-1.on.aws/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                // Process the response data
                console.log(data);
                return data;
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
                throw error;
            });
}

export { loginUser, registerUser };
import { userRegisterData, userLoginData, userEditData } from './dataClasses';

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

async function editUser(data: userEditData): Promise<any> {
    console.log(data);
    console.log('edit user');

    return fetch('https://myembg75opgf4gylftxdq2uwba0ghbxb.lambda-url.ca-central-1.on.aws/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data;
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}

async function deleteUser(data: { email: string }): Promise<any> {
    console.log('delete user', data);

    return fetch('https://pqzthzbhkepcvdwlrx7zvpgsaa0mjfqq.lambda-url.ca-central-1.on.aws/?email=' + encodeURIComponent(data.email), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('User deleted:', data);
        return data;
    })
    .catch(error => {
        console.error('Error deleting user:', error);
        throw error;
    });
}

export { loginUser, registerUser, editUser, deleteUser };
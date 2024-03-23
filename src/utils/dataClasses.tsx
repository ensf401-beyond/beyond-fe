interface userRegisterData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    isGoogle: boolean;
}

interface userLoginData {
    email: string;
    password: string;
    isGoogle: boolean;
}

interface userEditData {
    email: string;
    username: string;
    profilePic: string;
}

interface objectMapData {
    ngc: number;
    constellation: string;
    ra: number;
    dec: number;
    magnitude: number;
}

interface objectData {
    ngc: number;
    name: string;
    type: string;
    constellation: string;
    ra: number;
    dec: number;
    magnitude: number;
    collection: string;
}

export type { userRegisterData, userLoginData, userEditData, objectMapData, objectData};
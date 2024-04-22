import axios from 'axios';

const apiDef = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface UserSignUpData {
    email: string;
    displayName: string;
    photoURL: string;
    uid: string;
    idToken: string;
}

export interface UserSignInData {
    email: string;
    uid: string;
    idToken: string;
}

export const getUserInfo = async (userId: string) => {
    try {
        const response = await apiDef.get(`/users/  ${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};

export const signUp = async (userData: UserSignUpData) => {
    try {
        const response = await apiDef.post('/api/users/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

export const signIn = async (userData: UserSignInData) => {
    try {
        const response = await apiDef.post('/api/users/login', userData);
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
}

export const checkUserType = async (userId: string) => {
    try {
        const response = await apiDef.get(`/users/type/${userId}`);
        return response.data.userType;
    } catch (error) {
        console.error('Error fetching user type:', error);
        throw error;
    }
}

// Endpoint to get a user by name, if a part of the name is also given, get the related users
export const getUserByName = async (name: string) => {
    try {
        const response = await apiDef.get(`/users/search/${name}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user by name:', error);
        throw error;
    }
}

// update the user supervisor patch request
export const updateUserSupervisor = async (userId: string, supervisorId: string) => {
    try {
        const response = await apiDef.patch(`/users/updateSupervisor/${userId}`, { supervisorId });
        return response.data;
    } catch (error) {
        console.error('Error updating user supervisor:', error);
        throw error;
    }
}
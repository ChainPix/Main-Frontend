import axios from 'axios';

const apiDef = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getLeaveTypes = async () => {
    try {
        apiDef.defaults.headers.common['Authorization'] = `Bearer ${document.cookie.split(';').find(c => c.trim().startsWith('authToken=')).split('=')[1]}`;
        // get organization in the cookie
        const organization = document.cookie.split(';').find(c => c.trim().startsWith('organization=')).split('=')[1];
        const response = await apiDef.get(`/api/organizations/leaveTypes/${organization}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching leave types:', error);
        throw error;
    }
}
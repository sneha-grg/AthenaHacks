import axios from 'axios';

const BASE_URL = "http://127.0.0.1:5000";

export const setLiveThreats = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/live-threat-feed`);
        console.log("These are the threats:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching threats:", error);
        throw error;
    }
};
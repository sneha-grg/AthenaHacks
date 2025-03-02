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

export const getNames = async (name) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/add-player`, { name }); // Use POST instead of GET
        console.log("Name:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching name:", error);
        throw error;
    }
};


export const setSystemSymptoms = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/system_symptoms`);
        console.log("These are the symptoms:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching symptoms:", error);
        throw error;
    }
};

export const setHealthBar = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/health`);
        console.log("These are the current health stats:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching health stats:", error);
        throw error;
    }
};

export const getPlayerAction = async (fileName, playerName, action) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/perform-action/${fileName}`, {
            player_name: playerName,  
            action: action
        });

        console.log("Action Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending action:", error);
        throw error;
    }
};
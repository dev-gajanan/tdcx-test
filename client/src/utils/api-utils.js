import axios from 'axios';

export const axiosConfig = {
    baseURL: `http://localhost:5050`,
    headers: {
        Accept: 'application/json',
    }
};

export const request = axios.create(axiosConfig);
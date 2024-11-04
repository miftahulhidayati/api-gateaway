import axios from 'axios';

const { TIMEOUT } = process.env;

export default (baseUrl) => {
    return axios.create({
        baseURL: baseUrl,
        timeout: parseInt(TIMEOUT)
    });
};
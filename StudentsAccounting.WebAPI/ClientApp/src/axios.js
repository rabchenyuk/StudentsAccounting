import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:44307/api/'
});

export default instance;
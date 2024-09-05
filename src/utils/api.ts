import axios, { AxiosInstance } from 'axios';

const api = axios.create({
    baseURL: 'https://emoji-api.com',
    params: {
        access_key: '1830a5ce8d5993eb86ae3e5cebeb6c313c1de38e'
    }
});
export default api;
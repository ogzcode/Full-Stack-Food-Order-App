import axios from 'axios';
import TokenManager from './tokenServices';

export const request = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setupInterceptors = () => {
    request.interceptors.request.use(
        (config) => {
            const token = TokenManager.getToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    request.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error)
            if (error.code === 'ECONNABORTED') {
                TokenManager.destroyToken();
            }
            return Promise.reject(error);
        }
    );
}
import axios from 'axios';
import TokenManager from './tokenServices';

export const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
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
            if (error.response.status === 401) {
                TokenManager.destroyToken();
            }
            return Promise.reject(error);
        }
    );
}
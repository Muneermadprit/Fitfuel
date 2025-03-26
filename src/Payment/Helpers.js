import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export default Axios;
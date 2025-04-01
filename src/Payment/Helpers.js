import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://api.dailyfit.ae/api/user/',
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
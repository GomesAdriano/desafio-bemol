import axios from 'axios';

export const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Credentials': true,
    'X-Requested-With': 'XMLHttpRequest',
};

class Http {

    constructor() {
        this.instance = null;
    }

    get http() {
        return this.instance != null ? this.instance : this.initHttp();
    }

    initHttp() {
        const apiUrl = import.meta.env.VITE_API_URL;

        const http = axios.create({
            baseURL: apiUrl,
            headers,
            withCredentials: true,
        });
        this.instance = http;
        return http;
    }
}

export const instance = new Http();

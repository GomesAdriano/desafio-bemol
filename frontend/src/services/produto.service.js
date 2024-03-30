import axios from "axios";
import { instance } from "../utils/http"

export const getProdutos = async () => {

    const res = await instance.http.get('/produto')
    .then((response) => {
        return response.data;
    }).catch((error) => {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              window.location.href = "/";
            }
        }
    });
    return res;
}
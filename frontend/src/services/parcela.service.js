import { instance } from "../utils/http";

export const pagarParcela = async (parcela) => { 
    const res = await instance.http.put('/parcela', parcela)
    .then((response) => {
        return response.data.msg;
    }).catch((error) => {
        return error;
    });         
    return res;         
}
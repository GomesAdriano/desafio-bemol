import { instance } from '../utils/http';

export const getCreditoCliente = async () => {
    const res = await instance.http
        .get('/credito')
        .then((response) => {
            return response.data.saldo;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

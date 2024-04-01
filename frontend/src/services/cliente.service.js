import { instance } from '../utils/http';

export const createCliente = async (cliente) => {
    const res = await instance.http
        .post('/cliente', cliente)
        .then((response) => {
            return response.data.msg;
        })
        .catch((error) => {
            return error.response.data.msg;
        });
    return res;
};

export const loginCliente = async (cpf, senha) => {
    try {
        const response = await instance.http.put('/cliente', { cpf, senha });
        return { error: null, data: response.data };
    } catch (error) {
        return { error: error.response.data.msg, data: null };
    }
};

export const logoutCliente = async () => {
    try {
        await instance.http.delete('/cliente');
        localStorage.removeItem('cliente');
        window.location.href = '/';
    } catch (error) {
        console.log(error);
    }
};

export const infoCliente = () => {
    return JSON.parse(localStorage.getItem('cliente'));
};

export const getCep = async (cep) => {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    const erro = data.erro;
    return erro != true ? data : false;
};

import { instance } from '../utils/http';

export const loginCliente = async (cpf, senha) => {     
    
    const res = await instance.http.put('/cliente', { cpf, senha })
    .then((response) => {
        return response.data.msg;
    })
    .catch((error) => {
        return error.response.data.msg;
    });
    return res;
}

export const createCliente = async (cliente) => {   
    const res = await instance.http.post('/cliente', cliente)
    .then((response) => {
        return response.data.msg;
    }).catch((error) => {
        return error.response.data.msg;
    });         
    return res;   
}

export const getCep = async (cep) => {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    const erro =  data.erro;
    return erro != true ? data : false;
}
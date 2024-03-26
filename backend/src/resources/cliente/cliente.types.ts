import { RowDataPacket } from 'mysql2';

export type ClienteDto = {
    cliente_cpf: string;
    nome_completo: string;
    email: string;
    telefone: string;
    senha: string;
    saldo: number;
    endereco: EnderecoDto;
};

export type EnderecoDto = {
    endereco_id?: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
};

export type CadastroClienteDto = Omit<ClienteDto, 'saldo'>;
export type CadastroEnderecoDto = Omit<EnderecoDto, 'endereco_id'>;

export interface ListClienteDto extends ClienteDto, RowDataPacket {}

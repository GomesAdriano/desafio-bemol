import { RowDataPacket } from 'mysql2';

export type ProdutoDto = {
    produto_id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
};

export interface ListProdutoDto extends ProdutoDto, RowDataPacket {}

import { RowDataPacket } from 'mysql2';
import { ProdutoDto } from '../produto/produto.type';
import { ParcelaDto } from '../parcela/parcela.types';

export type CompraDto = {
    compra_id: string;
    data_compra: Date;
    qtd_parcela: number;
    valor_total: number;
    quitado: boolean;
    cliente_cpf: string;
    produto: ProdutoDto;
    parcela: ParcelaDto[];
};

export type CadastroCompraDto = Pick<CompraDto, 'qtd_parcela' | 'valor_total'> & {
    produto_id: string;
};

export interface ListCompraDto extends CompraDto, RowDataPacket {}

import { ResultSetHeader } from 'mysql2';
import { Connection } from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import { CadastroCompraDto } from '../compra/compra.types';
import { addDays } from 'date-fns';
import { AtualizarParcelaDto } from './parcela.types';
import connection from '../../mysql/dbConnection';
import { devolverCredito } from '../credito/credito.service';
import { atualizarCompra } from '../compra/compra.service';

export const criarParcela = async (
    compraId: string,
    compra: CadastroCompraDto,
    dataCompra: Date,
    con: Connection,
) => {
    const valorParcela = Number((compra.valor_total / compra.qtd_parcela).toFixed(2));
    let valorTotalParcelas = valorParcela * compra.qtd_parcela;
    const diferenca = compra.valor_total - valorTotalParcelas;
    const valorUltimaParcela = valorParcela + diferenca;

    let dataVencimento = dataCompra;
    for (let i = 0; i < compra.qtd_parcela - 1; i++) {
        dataVencimento = addDays(dataVencimento, 30);
        await inserirParcela(compraId, i + 1, valorParcela, dataVencimento, con);
    }

    dataVencimento = addDays(dataVencimento, 30);
    await inserirParcela(compraId, compra.qtd_parcela, valorUltimaParcela, dataVencimento, con);
};

export const atualizarParcela = async (cpf: string, parcela: AtualizarParcelaDto) => {
    const con = await connection();

    try {
        const sql = 'UPDATE parcela SET paga = 1 WHERE parcela_id = ?';
        await con.beginTransaction();
        await con.execute<ResultSetHeader>(sql, [parcela.parcela_id]);
        await devolverCredito(cpf, parcela.valor_parcela, con);
        if (parcela.numero_parcela === parcela.qtd_parcela)
            await atualizarCompra(parcela.compra_id, con);
        await con.commit();
        return true;
    } catch (error) {
        console.error(error);
        await con.rollback();
        return false;
    } finally {
        await con.end();
    }
};

const inserirParcela = async (
    compraId: string,
    numeroParcela: number,
    valorParcela: number,
    vencimento: Date,
    con: Connection,
) => {
    const sql =
        'INSERT INTO `parcela`(`parcela_id`, `numero_parcela`, `valor_parcela`, `vencimento`, `compra_id`) VALUES (?, ?, ?, ?, ?)';
    const values = [uuidv4(), numeroParcela, valorParcela, vencimento, compraId];
    return await con.execute<ResultSetHeader>(sql, values);
};

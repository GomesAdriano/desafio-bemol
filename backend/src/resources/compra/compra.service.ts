import connection from '../../mysql/dbConnection';
import { ResultSetHeader } from 'mysql2';
import { Connection } from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';
import { CadastroCompraDto, ListCompraDto } from './compra.types';
import { utcToZonedTime } from 'date-fns-tz';
import { descontarCredito } from '../credito/credito.service';
import { criarParcela } from '../parcela/parcela.service';
import { format, toDate } from 'date-fns';

export const criarCompra = async (compra: CadastroCompraDto, cpf: string): Promise<boolean> => {
    const dataCompra = utcToZonedTime(new Date(), 'America/Manaus');
    const compraId = uuidv4();
    const con = await connection();

    try {
        await con.beginTransaction();
        await inserirCompra(cpf, compraId, dataCompra, compra, con);
        await criarParcela(compraId, compra, dataCompra, con);
        await descontarCredito(cpf, compra.valor_total, con);
        await con.commit();
        return true;
    } catch (err) {
        console.error(err);
        await con.rollback();
        return false;
    } finally {
        await con.end();
    }
};

export const getCompras = async (cpf: string) => {
    const con = await connection();

    try {
        const sql = `SELECT
                        c.*,
                        p.produto_id,
                        p.nome AS produto_nome,
                        p.descricao AS produto_descricao,
                        p.preco AS produto_preco,
                        p.imagem AS produto_imagem,
                        pa.*
                    FROM
                        compra c
                    LEFT JOIN
                        produto p ON c.produto_id = p.produto_id
                    LEFT JOIN
                        parcela pa ON c.compra_id = pa.compra_id        
                    WHERE c.cliente_cpf = ?
                    ORDER BY
                        c.data_compra DESC,
                        c.compra_id,
                        pa.numero_parcela`;

        const [compras] = await con.execute<ListCompraDto[]>(sql, [cpf]);
        return compras;
    } catch (err) {
        console.error(err);
        throw error;
    } finally {
        await con.end();
    }
};

export const atualizarCompra = async (compra_id: string, con: Connection) => {
    const sql = `UPDATE compra SET quitado = 1 WHERE compra_id = ?`;
    return await con.execute<ResultSetHeader>(sql, [compra_id]);
};

const inserirCompra = async (
    cpf: string,
    compraId: string,
    dataCompra: Date,
    compra: CadastroCompraDto,
    con: Connection,
) => {
    const sql =
        'INSERT INTO `compra`(`compra_id`, `data_compra`, `qtd_parcela`, `valor_total`, `cliente_cpf`, `produto_id`) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [
        compraId,
        dataCompra,
        compra.qtd_parcela,
        compra.valor_total,
        cpf,
        compra.produto_id,
    ];
    return await con.execute<ResultSetHeader>(sql, values);
};

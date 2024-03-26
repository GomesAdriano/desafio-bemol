import { error } from 'console';
import connection from '../../mysql/dbConnection';
import { ListProdutoDto } from './produto.type';

export const getProdutos = async () => {
    const con = await connection();

    try {
        const sql = `SELECT * FROM produto`;
        const [produtos] = await con.execute<ListProdutoDto[]>(sql);
        return produtos;
    } catch (err) {
        console.error(err);
        throw error;
    } finally {
        await con.end();
    }
};

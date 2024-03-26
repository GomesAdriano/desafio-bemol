import { ResultSetHeader } from 'mysql2';
import { produtos } from '../mock/produtos.mock';
import connection from './dbConnection';
import { error } from 'console';

const inserirProdutos = async () => {
    let stringValues = '(?, ?, ?, ?, ?)';
    for (let i = 0; i < produtos.length - 1; i++) stringValues += ', (?, ?, ?, ?, ?)';

    const sql = `INSERT IGNORE INTO produto(produto_id, nome, descricao, preco, imagem) VALUES ${stringValues}`;
    const values = produtos.flatMap((produto) => Object.values(produto));
    const con = await connection();

    try {
        await con.execute<ResultSetHeader>(sql, values);
    } catch (err) {
        console.error(err);
        throw error;
    } finally {
        await con.end();
    }
};

export default inserirProdutos;

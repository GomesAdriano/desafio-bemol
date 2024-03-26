import { ResultSetHeader } from 'mysql2';
import { Connection, RowDataPacket } from 'mysql2/promise';
import connection from '../../mysql/dbConnection';
import { error } from 'console';

export const descontarCredito = async (cpf: string, valor: number, con: Connection) => {
    const sql = `UPDATE cliente SET saldo = saldo - ? WHERE cliente_cpf = ?`;
    const values = [valor, cpf];
    return await con.execute<ResultSetHeader>(sql, values);
};

export const devolverCredito = async (cpf: string, valor: number, con: Connection) => {
    const sql = `UPDATE cliente SET saldo = saldo + ? WHERE cliente_cpf = ?`;
    const values = [valor, cpf];
    return await con.execute<ResultSetHeader>(sql, values);
};

export const getCredito = async (cpf: string) => {
    const con = await connection();

    try {
        const sql = `SELECT saldo FROM cliente WHERE cliente_cpf = ?`;
        const [saldo] = await con.execute<RowDataPacket[]>(sql, [cpf]);
        return saldo[0];
    } catch (err) {
        console.error(err);
        throw error;
    } finally {
        await con.end();
    }
};

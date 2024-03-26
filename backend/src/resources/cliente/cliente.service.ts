import generateHashPassword from '../../utils/generateHashPassword';
import connection from '../../mysql/dbConnection';
import bcrypt from 'bcryptjs';
import { CadastroClienteDto, CadastroEnderecoDto, ListClienteDto } from './cliente.types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Connection } from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';

export const criarCliente = async (cliente: CadastroClienteDto): Promise<boolean> => {
    const hash = await generateHashPassword(cliente.senha);
    const con = await connection();

    try {
        await con.beginTransaction();
        await inserirCliente(cliente, hash, con);
        await inserirEndereco(cliente.cliente_cpf, cliente.endereco!, con);
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

export const loginCliente = async (cpf: string, senha: string): Promise<ListClienteDto | null> => {
    const con = await connection();

    try {
        const sql = `SELECT c.*, e.* FROM cliente c INNER JOIN endereco e ON c.cliente_cpf = e.cliente_cpf WHERE c.cliente_cpf = ?`;
        const [cliente] = await con.execute<ListClienteDto[]>(sql, [cpf]);

        if (cliente.length === 0) return null;
        const senhaConfere = await bcrypt.compare(senha, cliente[0].senha);

        return senhaConfere ? cliente[0] : null;
    } catch (err) {
        console.error(err);
        throw error;
    } finally {
        await con.end();
    }
};

const inserirCliente = async (cliente: CadastroClienteDto, hash: string, con: Connection) => {
    const sql =
        'INSERT INTO `cliente`(`cliente_cpf`, `nome_completo`, `email`, `telefone`, `senha`) VALUES (?, ?, ?, ?, ?)';
    const values = [
        cliente.cliente_cpf,
        cliente.nome_completo,
        cliente.email,
        cliente.telefone,
        hash,
    ];
    return await con.execute<ResultSetHeader>(sql, values);
};

const inserirEndereco = async (cpf: string, endereco: CadastroEnderecoDto, con: Connection) => {
    const sql =
        'INSERT INTO `endereco`(`endereco_id`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `estado`, `cep`, `cliente_cpf`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
        uuidv4(),
        endereco.logradouro,
        endereco.numero,
        endereco.complemento,
        endereco.bairro,
        endereco.cidade,
        endereco.estado,
        endereco.cep,
        cpf,
    ];
    return await con.execute<ResultSetHeader>(sql, values);
};

const valorExiste = async (campo: string, valor: string): Promise<boolean> => {
    const con = await connection();

    try {
        const sql = `SELECT ${campo} FROM cliente WHERE ${campo} = ?`;
        const [rows] = await con.execute<RowDataPacket[]>(sql, [valor]);
        return !!rows.length;
    } catch (err) {
        console.error(err);
        throw error;
    } finally {
        await con.end();
    }
};

export const cpfExiste = async (cpf: string) => {
    return await valorExiste('cliente_cpf', cpf);
};

export const emailExiste = async (email: string) => {
    return await valorExiste('email', email);
};

export const telefoneExiste = async (telefone: string) => {
    return await valorExiste('telefone', telefone);
};

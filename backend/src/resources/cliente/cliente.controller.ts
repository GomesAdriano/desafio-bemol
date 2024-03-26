import { Request, Response } from 'express';
import { CadastroClienteDto } from './cliente.types';
import {
    criarCliente,
    cpfExiste,
    emailExiste,
    telefoneExiste,
    loginCliente,
} from './cliente.service';

const cadastrarCliente = async (req: Request, res: Response) => {
    const cliente = req.body as CadastroClienteDto;

    try {
        if (await cpfExiste(cliente.cliente_cpf))
            return res.status(400).json({ msg: 'CPF atualmente em uso' });

        if (await emailExiste(cliente.email))
            return res.status(400).json({ msg: 'E-mail atualmente em uso' });

        if (await telefoneExiste(cliente.telefone))
            return res.status(400).json({ msg: 'Telefone atualmente em uso' });

        const createdCliente = await criarCliente(cliente);
        if (!createdCliente) return res.status(500).json({ msg: 'Erro ao cadastrar cliente' });

        res.status(201).json({ msg: 'Cliente cadastrado com sucesso' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const login = async (req: Request, res: Response) => {
    const { cpf, senha } = req.body;

    try {
        const cliente = await loginCliente(cpf, senha);
        if (!cliente) return res.status(401).json({ msg: 'CPF e/ou Senha incorretos' });
        req.session.uid = cliente.cliente_cpf;
        res.status(201).json({ msg: 'Cliente autenticado com sucesso' });
    } catch (error) {
        res.status(500).json(error);
    }
};

export default { cadastrarCliente, login };

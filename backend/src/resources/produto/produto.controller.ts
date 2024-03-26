import { Request, Response } from 'express';
import { getProdutos } from './produto.service';

const listarProdutos = async (req: Request, res: Response) => {
    try {
        const produtos = await getProdutos();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json(error);
    }
};

export default { listarProdutos };

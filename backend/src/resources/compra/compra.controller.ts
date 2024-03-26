import { Request, Response } from 'express';
import { CadastroCompraDto } from './compra.types';
import { criarCompra, getCompras } from './compra.service';

const efetuarCompra = async (req: Request, res: Response) => {
    const compra = req.body as CadastroCompraDto;

    try {
        const createdCompra = await criarCompra(compra, req.session.uid!);
        if (!createdCompra) return res.status(500).json({ msg: 'Erro ao efetuar compra' });
        res.status(201).json({ msg: 'Compra realizada com sucesso' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const listarComprasParceladas = async (req: Request, res: Response) => {
    try {
        const compras = await getCompras(req.session.uid!);
        res.status(200).json(compras);
    } catch (error) {
        res.status(500).json(error);
    }
};

export default { efetuarCompra, listarComprasParceladas };

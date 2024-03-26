import { Request, Response } from 'express';
import { getCredito } from './credito.service';

const listarCreditoCliente = async (req: Request, res: Response) => {
    try {
        const credito = await getCredito(req.session.uid!);
        res.status(200).json(credito);
    } catch (error) {
        res.status(500).json(error);
    }
};

export default { listarCreditoCliente };

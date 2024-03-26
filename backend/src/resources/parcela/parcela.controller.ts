import { Request, Response } from 'express';
import { AtualizarParcelaDto } from './parcela.types';
import { atualizarParcela } from './parcela.service';

const pagarParcela = async (req: Request, res: Response) => {
    const parcela = req.body as AtualizarParcelaDto;

    try {
        const updatedParcela = await atualizarParcela(req.session.uid!, parcela);
        res.status(200).json({ msg: 'Parcela paga com sucesso' });
    } catch (error) {
        res.status(500).json(error);
    }
};

export default { pagarParcela };

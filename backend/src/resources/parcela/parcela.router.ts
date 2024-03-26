import { Router } from 'express';
import parcelaController from './parcela.controller';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.put('/', isAuth, parcelaController.pagarParcela);

export default router;

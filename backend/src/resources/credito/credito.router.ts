import { Router } from 'express';
import creditoController from './credito.controller';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, creditoController.listarCreditoCliente);

export default router;

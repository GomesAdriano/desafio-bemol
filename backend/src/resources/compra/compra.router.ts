import { Router } from 'express';
import isAuth from '../../middlewares/isAuth';
import compraController from './compra.controller';

const router = Router();

router.post('/', isAuth, compraController.efetuarCompra);
router.get('/', isAuth, compraController.listarComprasParceladas);

export default router;

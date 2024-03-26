import { Router } from 'express';
import produtoController from './produto.controller';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, produtoController.listarProdutos);

export default router;

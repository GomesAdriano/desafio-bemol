import { Router } from 'express';
import clienteRouter from '../resources/cliente/cliente.router';
import produtoRouter from '../resources/produto/produto.router';
import compraRouter from '../resources/compra/compra.router';
import parcelaRouter from '../resources/parcela/parcela.router';
import creditoRouter from '../resources/credito/credito.router';

const router = Router();

router.use(
    '/cliente',
    clienteRouter
);

router.use(
    '/produto',
    produtoRouter
);

router.use(
    '/compra',
    compraRouter
);

router.use(
    '/parcela',
    parcelaRouter
);

router.use(
    '/credito',
    creditoRouter
);

export default router;
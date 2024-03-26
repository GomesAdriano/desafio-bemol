import { Router } from 'express';
import clienteController from './cliente.controller';

const router = Router();

router.post('/', clienteController.cadastrarCliente);
router.put('/', clienteController.login);

export default router;

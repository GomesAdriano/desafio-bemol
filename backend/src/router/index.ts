import { Router } from 'express';
import routers from './routers';

const router = Router();

router.use('/api', routers);

export default router;

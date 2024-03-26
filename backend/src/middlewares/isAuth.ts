import { Request, Response, NextFunction } from 'express';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.uid) next();
    else res.status(401).json({ msg: 'Cliente não está logado' });
};

export default isAuth;

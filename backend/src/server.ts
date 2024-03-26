import express from 'express';
import cors from 'cors';
import session from 'express-session';
import error from 'console';
import { v4 as uuidv4 } from 'uuid';
import { api } from './api-info';
import router from './router';

declare module 'express-session' {
    interface SessionData {
        uid: string;
    }
}

export class Api {
    public server: express.Application;
    public publicPath: string;

    constructor() {
        this.server = express();
        this.publicPath = `${process.cwd()}/public`;
    }

    async bootstrap(): Promise<Api> {
        try {
            await this.middleware();
            await this.router();
        } catch (err) {
            console.error(err);
        }

        return this;
    }

    private async middleware() {
        this.server.use(
            cors({
                credentials: true,
                origin: api.frontendUrl,
            }),
        );
        this.server.use(express.json());
        this.server.use(
            session({
                genid: () => uuidv4(),
                secret: '!nXhzD^645',
                resave: true,
                saveUninitialized: true,
            }),
        );
    }

    private async router() {
        this.server.use(router);
        try {
            this.server.listen(api.defaultPort);
        } catch (err) {
            console.error(err);
            throw error;
        }
    }
}

import dotenv from 'dotenv';
import { api } from './api-info';
import { Api } from './server';
import executarSeeds from './mysql/seeds';

dotenv.config();

const server = new Api();

try {
    server.bootstrap().then(() => {
        console.info(`${api.name} rodando na porta ${api.defaultPort}`);
        executarSeeds();
    });
} catch (error) {
    console.error('Server failed to start.');
    console.error(error);
    process.exit(1);
}

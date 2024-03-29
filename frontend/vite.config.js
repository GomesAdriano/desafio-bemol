import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(process.env.PORT) || 3366;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: PORT,
        watch: {
            usePolling: false,
        },
    },
});

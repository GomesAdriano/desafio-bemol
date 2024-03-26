import mysql, { ConnectionOptions } from 'mysql2/promise';
import dotenv from 'dotenv';
import { error } from 'console';
dotenv.config();

const access: ConnectionOptions = {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT!),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};

const connection = async () => {
    try {
        return await mysql.createConnection(access);
    } catch (err) {
        console.error(err);
        throw error;
    }
};

export default connection;

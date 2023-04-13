import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config({path: '../../.env'});

const db = new Sequelize(process.env.SCHEMA, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
});

export default db;
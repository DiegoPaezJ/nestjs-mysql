import { config } from "dotenv";
import { DataSource } from "typeorm";

const env = process.env.NODE_ENV || 'development';

config({
    path: `.env.${env}`,

});

export default new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: ['src/**/*.entity.ts'],
    migrations:['src/database/migrations/*.ts'],
    // synchronize: true,
    // ssl: process.env.MYSQL_SSL === 'true',
    // extra: {
    //     ssl:
    //         process.env.MYSQL_SSL === 'true'
    //             ? {
    //                 rejectUnauthorized: false,
    //             }
    //             : null,
    // },

});
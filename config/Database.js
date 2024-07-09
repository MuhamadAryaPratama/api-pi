import { Sequelize } from "sequelize";
import mysql2 from 'mysql2';

const db = new Sequelize('data_barang', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: mysql2,
});

export default db;

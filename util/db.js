const Sequelize = require('sequelize');
const mysql = require('mysql2');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_PASSWORD,
    process.env.DB_USER,{
        host: process.env.DB_HOST,
        dialect : "mysql",
    }
);

module.exports = sequelize;
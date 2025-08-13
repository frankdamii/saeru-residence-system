const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables de entorno

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Poner en `true` para ver las consultas SQL en la consola
  }
);
module.exports = sequelize;
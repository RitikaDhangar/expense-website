require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.RDS_ENDPOINT,
    dialect: process.env.DIALECT,
  }
);
module.exports = sequelize;
// "ritika91@"
// 'Ritika000@'

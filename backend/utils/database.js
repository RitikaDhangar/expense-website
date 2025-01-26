const Sequelize = require("sequelize");
const sequelize = new Sequelize("expensetracker", "root", "ritika91@", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = sequelize;
// "ritika91@"
// 'Ritika000@'

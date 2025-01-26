const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    useremail: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    userpassword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isPremiumUser: Sequelize.BOOLEAN,
  },
  { timestamps: false }
);
module.exports = User;

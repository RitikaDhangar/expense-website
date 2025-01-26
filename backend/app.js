const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./utils/database");
const UserRouter = require("./route/UserRoute");
const ExpenseRouter = require("./route/ExpenseRoute");
const OrderRouter = require("./route/OrderRoute");
const Expense = require("./model/Expense");
const User = require("./model/User");
const Order = require("./model/Order");
app.use(cors());
app.use(express.json());
// router
app.use(UserRouter);
app.use(ExpenseRouter);
app.use(OrderRouter);

// User & Expense relationship
User.hasMany(Expense);
Expense.belongsTo(User);

// User & Order relationship
User.hasMany(Order);
Order.belongsTo(User);

// connect to server
const connectSeverHandler = async () => {
  try {
    await sequelize.sync();
    app.listen(8000);
  } catch (err) {
    console.log(err);
  }
};
connectSeverHandler();

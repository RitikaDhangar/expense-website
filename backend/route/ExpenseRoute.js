const express = require("express");
const Router = express.Router();
const expenseController = require("../controller/ExpenseController");
const userMiddleware = require("../middleware/auth");
Router.post(
  "/add-expense",
  userMiddleware.checkUserAuthentication,
  expenseController.addNewExpense
);
Router.get(
  "/fetch-expenses",
  userMiddleware.checkUserAuthentication,
  expenseController.fetchAllExpenses
);
Router.delete(
  "/delete-expense/:id",
  userMiddleware.checkUserAuthentication,
  expenseController.deleteExpense
);
module.exports = Router;

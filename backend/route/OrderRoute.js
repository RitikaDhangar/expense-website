const express = require("express");
const Router = express.Router();
const userMiddleware = require("../middleware/auth");
const OrderController = require("../controller/OrderController");
Router.get(
  "/premiumCustomer",
  userMiddleware.checkUserAuthentication,
  OrderController.purchasePremium
);
Router.post(
  "/confirmpremiumCustomer",
  userMiddleware.checkUserAuthentication,
  OrderController.premiumMember
);
module.exports = Router;

const Order = require("../model/Order");
const Razorpay = require("razorpay");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.purchasePremium = async (req, res) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.PAYMENT_SECRET_ID,
      key_secret: process.env.PAYMENT_SECRET_KEY,
    });
    const amount = 200000;
    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        return res.send({ message: "Something went wrong", success: 0, err });
      }
      try {
        await req.user.createOrder({ orderid: order.id, status: "PENDING" });
        res.send({ order, key_id: rzp.key_id, success: 1 });
      } catch (err) {
        res.send({ message: "Something went wrong", success: 0, err });
      }
    });
  } catch (err) {
    res.send({ message: "Something went wrong", success: 0, err });
  }
};
const updatedJWTTokenHandler = (user) => {
  return jwt.sign(
    {
      userid: user.id,
      username: user.username,
      isPremiumUser: user.isPremiumUser,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
};
exports.premiumMember = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    await Order.update(
      {
        paymentid: payment_id,
        status: "SUCCESS",
      },
      {
        where: {
          orderid: order_id,
        },
      }
    );
    await req.user.update({
      isPremiumUser: true,
    });
    return res.send({
      message: "Tranaction Successful",
      success: 1,
      token: updatedJWTTokenHandler(req.user),
    });
  } catch (err) {
    console.log(err);
    res.send({ message: "Something went wrong", success: 0, err });
  }
};

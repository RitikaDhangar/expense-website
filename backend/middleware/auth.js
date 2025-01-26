const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();
const checkUserAuthentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const userId = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findByPk(userId.userid);
    if (!user) {
      res.send({ message: "User not found", success: 0 });
    }
    req.user = user;
    next();
  } catch (err) {
    res.send({ message: "something went wrong", success: 0, err });
  }
};
module.exports = { checkUserAuthentication };

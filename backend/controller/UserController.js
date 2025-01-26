const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.postuserInfo = async (req, res) => {
  try {
    const { username, useremail, userpassword } = req.body;
    if (!username || !useremail || !userpassword) {
      return res.send({ message: "Enter all Fields", success: 0 });
    }
    const isUserExist = await User.findOne({
      where: {
        useremail,
      },
    });
    if (isUserExist) {
      return res.send({ message: "User already Exist", success: 0 });
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(userpassword, saltRounds);
    await User.create({
      useremail,
      username,
      userpassword: hashPassword,
    });
    return res.send({ message: "Create User Successfully", success: 1 });
  } catch (err) {
    res.send({ message: "something west wrong", success: 0, err });
  }
};
const getAuthorizationToken = (user) => {
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
exports.loginUser = async (req, res) => {
  try {
    const { useremail, userpassword } = req.body;
    if (!useremail || !userpassword) {
      return res.send({ message: "Enter all Fields", success: 0 });
    }
    const isUserExist = await User.findOne({
      where: {
        useremail,
      },
    });

    if (!isUserExist) {
      return res.send({ message: "User does not exist", success: 0 });
    }
    const isMatch = await bcrypt.compare(
      userpassword,
      isUserExist?.userpassword
    );
    if (!isMatch) {
      return res.send({
        message: "Password is incorrect",
        success: 0,
      });
    }
    const token = getAuthorizationToken(isUserExist);
    return res.send({
      message: "User LoggedIn Successfully",
      success: 1,
      token,
    });
  } catch (err) {
    res.send({ message: "something west wrong", success: 0, err });
  }
};

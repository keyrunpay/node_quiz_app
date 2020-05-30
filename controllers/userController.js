const mongoose = require("mongoose");
const jwt = require("jwt-then");
const User = mongoose.model("User");
const sha256 = require("js-sha256");

exports.register = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) throw "Insufficient arguments provided";
  const hashPassword = sha256(process.env.SALT + password);

  const userExists = await User.findOne({ email });
  if (userExists) throw "User with given email already exists";

  const newUser = new User({
    name,
    email,
    password: hashPassword,
  });
  await newUser.save();
  res.json({
    message: "User registered successfully",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw "Insufficient arguments provided";
  const hashPassword = sha256(process.env.SALT + password);
  const isUser = await User.findOne({ email, password: hashPassword });
  if (!isUser) throw "Invalid login";
  const tokenData = {
    id: isUser.id,
    name: isUser.name,
    email: isUser.email,
  };

  const accessToken = await jwt.sign(tokenData, process.env.SECRET);

  res.json({
    message: "Logged in successfully",
    data: tokenData,
    token: accessToken,
  });
};

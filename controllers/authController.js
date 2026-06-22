const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// GENERATE TOKEN FUNCTION
const generateToken = (id, role) => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res) => {
  // CREATE USER
  const user = await User.create(req.body);
  const token = generateToken(user.id, user.role);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  // IF CLIEND DID`T PROVIDE EMAIL || PASSWORD
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please enter email and password",
    });
  }
  // IF PROVIDE EMAIL AND PASSWORD AND EMAIL IS FOUNDED IN PASSWORD IS CORRECT
  const user = await User.findOne({ email });
  if (!user || !user.correctPassword(password, user.password)) {
    return res.status(200).json({
      status: "fail",
      message: "Please enter valid email and password",
    });
  }
  const token = generateToken(user.id, user.role);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new AppError("Please login", 401));
  }
  if (!req.headers.authorization.startsWith("Bearer")) {
    return next(new AppError("Invalid token format", 401));
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new AppError("Token required", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action"),
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  res.status(200).json({
    is: email,
  });
});

const { user } = require('../db/models'); // Import user model from aggregated models
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchErrors = require('../utils/catchErrors');
const displayError = require('../utils/displayError');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// signup controller
const signup = catchErrors(async (req, res, next) => {
  const body = req.body;

  if (!['1', '2'].includes(body.userType)) {
    throw new displayError('Invalid user type', 400);
  };

  const newUser = await user.create({
    userType: body.userType,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    // password will be hashed before saving
    confirmPassword: body.confirmPassword
  });

  if (!newUser) {
    return next(new displayError('User not created', 500));
  }

  const result = newUser.toJSON();

  // remove password and deletedAt from the response
  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });

  return res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    data: result,
  });
});

// login controller
const login = catchErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new displayError('Email and password are required', 400));
  }

  // find user by email and compare password
  const result = await user.findOne({ where: { email } });
  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new displayError('Invalid email or password', 401));
  }

  // generate token
  const token = generateToken({ id: result.id });

  return res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    token,
  });
});

module.exports = { signup, login };
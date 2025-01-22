const user = require('../db/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// signup controller
const signup = async (req, res, next) => {
  const body = req.body;

  // debugging parse issue
  // console.log('Received headers:', req.headers);
  // console.log('Received raw body:', req.rawBody); 
  // console.log('Received body:', body); 

  if (!['1', '2'].includes(body.userType)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid user type'
    });
  }

  const newUser = await user.create({
    userType: body.userType,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    // password will be hashed before saving
    confirmPassword: body.confirmPassword
  });

  const result = newUser.toJSON();

  // remove password and deletedAt from the response
  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });

  if (!result) {
    return res.status(400).json({
      status: 'Failed!',
      message: 'Failed to create user'
    });
  }
  return res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    data: result,
  });
};

// login controller
const login = async (req, res, next) => {
  // login logic
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide email and password'
    });
  }

  // find user by email and compare password
  const result = await user.findOne({ where: { email } });
  if (!result || !(await bcrypt.compare(password, result.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid email or password'
    });
  }
  // generate token
  const token = generateToken({
    id: result.id,
  });
  // return token
  return res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    token,
  });
};

module.exports = { signup, login };
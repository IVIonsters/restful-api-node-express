const displayError = require('../utils/displayError'); // Import displayError

// Error handling for development
const sendErrorDev = (error, res) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || 'error';
  const message = error.message || 'Internal Server Error';
  const stack = error.stack || error;

  res.status(statusCode).json({
    status,
    message,
    stack,
  });
}

// Error handling for production
const sendErrorProd = (error, res) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || 'error';
  const message = error.message || 'Internal Server Error';

  if (error.isOperational) {
    return res.status(statusCode).json({
      status,
      message,
    });
  }
  console.log('ERROR 💥', error.name, error.message, error.stack);
  return res.status(statusCode).json({
    status: 'error',
    message: 'Something went wrong, very very wrong'
  });
}

const globalErrorHandler = (err, req, res, next) => {
  //Token Error
  if (err.name === 'JsonWebTokenError') {
    err = new displayError('Invalid token, Please login again', 401);
  }
  // validation error
  if (err.name === 'SequelizeValidationError') {
    err = new displayError(err.errors[0].message, 400);
  }
  // unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    err = new displayError(err.errors[0].message, 400);
  }
  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res);
  }
  sendErrorProd(err, res);
}

module.exports = globalErrorHandler;
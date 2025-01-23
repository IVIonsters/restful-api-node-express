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
  const stack = error.stack || error;

  if (error.isOperational) {
    return res.status(statusCode).json({
      status,
      message,
    });
  }
  console.log('ERROR 💥', error.name, error.message, stack)
  return res.status(statusCode).json({
    status: 'error',
    message: 'Something went wrong, very very wrong'
  })

}

const globalErrorHandler = (err, req, res, next) => {
  (err, req, res, next) => {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      // cannot send error stack in production
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res);
  }
  sendErrorProd(err, res);
}

module.exports = globalErrorHandler;
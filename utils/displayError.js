class displayError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    // custom error class to check if the error is operational
    this.isOperational = true

    // capture to validate where the error is coming from
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = displayError
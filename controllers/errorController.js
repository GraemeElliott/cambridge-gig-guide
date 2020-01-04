const AppError = require('../utilities/appError');

const handleCastErrorDB = (error) => {
  const message = `Invalid ${error.path}: ${error.value}.`;
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = (error) => {
  const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log (value);
  const message = `Duplicate Field Value: ${value}. Please use another name.`;
  return new AppError(message, 400);
}

const handleValidationErrorDB = (error) => {
  const errors = Object.values(error.errors).map(element => element.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

const handleJWTError = () => new AppError('Invalid token. Please login again.', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired. Please login again', 401);

const sendErrorDev = (error, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(error.statusCode).json({
      status: error.status,
      error: error,
      message: error.message,
      stack: error.stack,
    });
  }

  // B) RENDERED WEBSITE
  console.error('Error: ', error);
  return res.status(error.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: error.message,
  });
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let prodError = { ...error };
    prodError.message = error.message;
    if (prodError.name === 'CastError') prodError = handleCastErrorDB(prodError);
    if (prodError.code === 11000) prodError = handleDuplicateFieldsDB(prodError);
    if (prodError.name === 'ValidationError') prodError = handleValidationErrorDB(prodError);
    if (prodError.name === 'JsonWebTokenError') prodError = handleJWTError();
    if (prodError.name === 'TokenExpiredError') prodError = handleJWTExpiredError();
  }
};

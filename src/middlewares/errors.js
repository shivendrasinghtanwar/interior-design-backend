const errorHandler = (error, req, res, next) => {
  const message = error.message || 'Something went wrong';
  let status = null;
  switch (error.name) {
    case 'ValidationError':
      status = 400;
      break;
    case 'PermissionError':
      status = 401;
      break;
    case 'AuthorizationError':
      status = 403;
      break;
    case 'DatabaseError':
      status = 500;
      break;
    case 'NotFoundError':
      status = 404;
      break;
    case 'OperationalError':
      status = 500;
      break;
    default:
      status = 400;
  }
  console.log(error);
  return res.status(status).json({ success: false, msg: message, data: {} });
};
module.exports = { errorHandler };

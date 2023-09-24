exports.errorResponse = (statusCode, message, error) => ({
  success: false,
  statusCode,
  message,
  error: error ? error : 'Error',
});

exports.successResponse = (statusCode, message, data) => ({
  success: true,
  statusCode,
  message,
  data,
});

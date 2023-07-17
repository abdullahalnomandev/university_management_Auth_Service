'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const handleValidationError = error => {
  const errors = Object.values(error.errors).map(({ path, message }) => ({
    path,
    message,
  }));
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorMessages: errors,
  };
};
exports.default = handleValidationError;

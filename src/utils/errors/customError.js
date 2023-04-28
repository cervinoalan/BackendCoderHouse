const { GENERIC_ERROR } = require("./enumsError");

class CustomError {
  static createError({ code = 500, msg, typeError = GENERIC_ERROR }) {
    const error = new Error(msg);
    error.code = code;
    error.typeError = typeError;
    return error;
  }
}

module.exports = CustomError;

const {
  MISSING_VALUE_ERROR,
  FORCED_ERROR,
  UNEXPECTED_VALUE,
  MONGO_CONNECTION_ERROR,
} = require("./enumsError");

const mdwError = (error, req, res, next) => {
  console.log({ error: error.code, msg: error.message });
  switch (error.typeError) {
    case MISSING_VALUE_ERROR:
      res
        .status(error.code)
        .json({
          msg: error.message,
          description: "Ocurrio un error por falta de datos",
        });
      break;

    case FORCED_ERROR:
      res
        .status(error.code)
        .json({ msg: error.message, description: "Ocurrio un error forzado" });
      break;

    case MONGO_CONNECTION_ERROR:
      res
        .status(error.code)
        .json({
          msg: error.message,
          description: "Ocurrio un error en la conexion con la base de datos",
        });
      break;

    case UNEXPECTED_VALUE:
      res
        .status(error.code)
        .json({
          msg: error.message,
          description: "Ocurrio un error, se ingreso un dato inesperado",
        });
      break;
    default:
      res
        .status(500)
        .json({
          mg: error.message,
          description: "Ocurrio un error desconocido",
        });
      break;
  }
};

module.exports = mdwError;

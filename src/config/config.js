const dotenv = require("dotenv");

dotenv.config();

const TYPE_DOCUMENTS = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];

module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SECRET: process.env.SECRET,
  LOGIN_STRATEGY: process.env.LOGIN_STRATEGY,
  REGISTER_STRATEGY: process.env.REGISTER_STRATEGY,
  URL_SERVICE: process.env.URL_SERVICE,
  MAILING: {
    USER: process.env.CORREO,
    PASSWORD: process.env.CORREO_PASSWORD,
  },
  PRIVATE_KEY_JWT: process.env.PRIVATE_KEY_JWT,
  TYPE_DOCUMENTS,
  PRIVATE_KEY_STRIPE:process.env.PRIVATE_KEY_STRIPE,
};

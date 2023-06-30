const UserDto = require("../dao/DTOs/user.dto");
const transport = require("../utils/mailing");
const CustomError = require("../utils/errors/customError");
const { UNEXPECTED_VALUE } = require("../utils/errors/enumsError");
const usersService = require("../repository/users.service");
const { generateToken, getUserByToken } = require("../utils/jwt");
const { hashPassword, comparePassword } = require("../utils/bcrypt");

const login = async (req, res, next) => {
  await usersService.lastConnection(req.user, new Date().toLocaleString());
  req.logger.info(`${req.user.first_name} - last connection updated`)
  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
    rol: req.user.rol,
  };
  // const userDtos = new UserDto(req.user);
  // res.send(userDtos);
  let token = generateToken({ id: req.user.id });
  const user = new UserDto(req.user);
  res.send({user, token});
};

const register = async (req, res) => {
  res.send(req.user);
};

const logout = async (req, res) => {
// LA LINEA DE ABAJO LA COMENTO PORQUE SALTA USER UNDEFINED
  // await usersService.lastConnection(req.user, new Date().toLocaleString());
  // req.logger.info(`${req.user.first_name} - last connection updated`)
  req.session.destroy((error) => {
    if (!error) {
      res.send("Sesion cerrada con exito!");
    } else {
      res.status(500).send("Ocurrio un error el cerrar sesion");
    }
  });
};

const current = async (req, res) => {
  const userDtos = new UserDto(req.user);
  res.send(userDtos);
};

const forgotPassword = async (req, res, next) => {
  try {
    let { email } = req.body;
    const user = await usersService.getUserByEmail({ email: email });
    console.log(user);
    if (user === null) {
      return res.status(404).json({ message: "El mail ingresado es invalido" });
    }
    let token = generateToken({ id: user.id });
    transport.sendMail({
      to: user.email,
      subject: `Hola ${user.first_name}`,
      html: `<a href="http://localhost:3000/forgotrecovery?token=${token}">Click aqui para restablecer contraseña</a>`,
    });
    res.json({
      status: "success",
      message: `Se envio un correo a ${user.first_name} para restablecer la contraseña`,
    });
  } catch (error) {
    return res.send({ status: "error", message: "Error inesperado" });
  }
};

const forgotRecovery = async (req, res, next) => {
  try {
    const newPassword = req.body.password;
    const token = req.params.token;
    if (!newPassword || !token) {
      return res.status(400).json({
        error: error,
        status: "error",
        message: "Invalid data",
      });
    }

    const user = await getUserByToken(token);

    if (!user) {
      return res.status(403).json({
        status: "error",
        message: "Token invalido",
      });
    }

    const validPassword = await comparePassword(newPassword, user.password);

    if (validPassword) {
      return res.status(403).json({
        status: "error",
        message: "La contraseña no puede ser igual a la anterior",
      });
    }

    const hashNewPassword = await hashPassword(newPassword);
    await usersService.updatePassword(user.id, hashNewPassword);

    return res.status(200).json({
      status: "success",
      message: "La contraseña se actualizo con exito",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Ocurrio un error inesperado ",
      error: error,
    });
  }
};

module.exports = {
  login,
  register,
  logout,
  current,
  forgotPassword,
  forgotRecovery,
};

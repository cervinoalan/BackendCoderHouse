const UserDto = require("../dao/DTOs/user.dto");
const transport = require("../utils/mailing");
const CustomError = require("../utils/errors/customError");
const { UNEXPECTED_VALUE } = require("../utils/errors/enumsError");
const usersService = require("../repository/users.service");

const login = async (req, res, next) => {
  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
    rol: req.user.rol,
  };
  const userDtos = new UserDto(req.user);
  res.send(userDtos);
};

const register = async (req, res) => {
  res.send(req.user);
};

const logout = async (req, res) => {
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

const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    const user = await usersService.getUserByEmail({ email: email });
    console.log(user);
    if (user === null) {
      return res.status(404).json({ message: 'El mail ingresado es invalido' });
    }
    // let token = generateToken({ id: user.id });
    // transport.sendMail({
    //   to: user.email,
    //   subject: `Hola ${user.first_name}`,
    //   html: `<a href="http://localhost:8080/api/session/redirectForgotPassword/${token}">aqui</a>`,
    // });
    res.json({
      status: "success",
      user,
    });
  } catch (error) {
    return res.send({ status: "error", message: "El email es inválido" });
  }
};

module.exports = {
  login,
  register,
  logout,
  current,
  forgotPassword,
};

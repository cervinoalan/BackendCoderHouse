const { MAILING } = require("../config/config");
const UserDto = require("../dao/DTOs/user.dto");
const mailingService = require("../repository/mailing.service");
const CustomError = require("../utils/errors/customError");
const { UNEXPECTED_VALUE } = require("../utils/errors/enumsError");

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
  console.log("hola")
  try {
    const result = await mailingService.sendMail({
      to: "cervino1999@gmail.com",
      subject: "Hola este es un mail de prueba",
      html: `<h1> Hola mail prueba</h1>`,
    });
    console.log(result);
    res.json({ msg: "Ok" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  register,
  logout,
  current,
  forgotPassword,
};

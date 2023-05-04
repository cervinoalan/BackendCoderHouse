const UserDto = require("../dao/DTOs/user.dto");
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
  const userDtos =  new UserDto(req.user);
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
  const userDtos =  new UserDto(req.user);
  res.send(userDtos);
};

module.exports = {
  login,
  register,
  logout,
  current,
};

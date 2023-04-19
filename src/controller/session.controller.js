const UserDto = require("../dao/DTOs/user.dto");

const login = async (req, res) => {
  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
    rol: req.user.rol,
  };
  res.send(req.user);
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
  const user = req.user
  const userDtos =  new UserDto(user);
  res.send(userDtos);
};

module.exports = {
  login,
  register,
  logout,
  current,
};

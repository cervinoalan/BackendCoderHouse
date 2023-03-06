const UsersModel = require("../dao/models/user.model");

const login = async (req, res) => {
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

module.exports = {
  login,
  register,
  logout,
};

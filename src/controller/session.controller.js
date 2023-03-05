const UsersModel = require("../dao/models/user.model");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({ email, password });
  if (user) {
    req.session.user = user;
    res.send(user);
  } else {
    res.status(401).send("Email o contraseña incorrectos");
  }
};

const register = async (req, res) => {
  try {
    const user = await UsersModel.create(req.body);
    res.send(user);
  } catch (error) {
    res.status(500).send("Error al crear usuario");
  }
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

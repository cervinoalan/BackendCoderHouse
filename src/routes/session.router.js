const { Router } = require('express');
const UsersModel = require('../dao/models/user.model');

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({ email, password });
  if (user) {
    req.session.user = user;
    res.send(user);
  } else {
    res.status(401).send('Email o contraseña incorrectos');
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await UsersModel.create(req.body);
    res.send(user);
  } catch (error) {
    res.status(500).send('Error al crear usuario');
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error) {
      res.send("Sesion cerrada con exito!");
    } else {
      res.status(500).send("Ocurrio un error el cerrar sesion")
    }
  });
});

module.exports = router;
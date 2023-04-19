const userAdmin = async (req, res, next) => {
  if (!req.user || req.user.rol !== "admin") {
    return res.status(401).json({
      status: "error",
      msg: "Usuario no autorizado ",
    });
  }
  next();
};

const userLogged = async (req, res, next) => {
  console.log(req.session.user);
  if (!req.session.user || req.session?.user?.rol !== "user") {
    return res.status(401).json({
      status: "error",
      msg: "Usuario no autorizado",
    });
  }
  next();
};

module.exports = { userAdmin, userLogged };

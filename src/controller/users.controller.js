const usersService = require("../repository/users.service");
const UserDto = require("../dao/DTOs/user.dto");
const local = require("dayjs/locale/ar");
const transport = require("../utils/mailing");
const moment = require("moment");

const getUsers = async (req, res) => {
  try {
    const users = await usersService.getUser();
    const usersDto = users.map((user) => new UserDto(user));
    res.json(usersDto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

const insertUser = async (req, res) => {
  try {
    const { user } = req.body;
    const userDTO = new DTOsUser(user);
    const newUser = await usersService.insertUser(userDTO);
    res.json({ msg: "ok", newUser });
  } catch (error) {
    res.status(500).json({ error: "Error al intentar insertar usuario" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, user } = req.body;
    const updatedUser = await usersService.updateUser(id, user);
    res.json({ msg: "ok", updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Error al intentar actualizar usuario" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedUser = await usersService.deleteUser(id);
    res.json({ msg: "ok", deletedUser });
  } catch (error) {
    res.status(500).json({ error: "Error al intentar eliminar usuario" });
  }
};

const deleteLastConnect = async (req, res, next) => {
  try {
    let users = await usersService.getUser();

    let deleteUsers = [];

    const expirationTime = moment().subtract(30, "minutes");

    users.forEach((user) => {
      if (!user.last_connection) {
        deleteUsers.push(user.email);
        return;
      }
      let userDate = moment(user.last_connection, "DD/MM/YYYY, hh:mm:ss");
      if (userDate.isBefore(expirationTime) && user.rol != "admin") {
        try {
          transport.sendMail({
            to: user.email,
            subject: "Su cuenta ha sido eliminada debido a inactividad",
            html: `
                    <div style="background-color: black; color: red; display: flex; flex-direction: column; justify-content: center;  align-items: center;">
                    <h1>Su cuenta ha sido eliminada!</h1>
                    </div>
                    `,
          });
        } catch (error) {
          req.logger.error("El mail del usuario no es válido");
        }
        deleteUsers.push(user.email);
        console.log(`${deleteUsers} son los usuarios con mas de 30min inactivos`);
      }
    });
    console.log(`${deleteUsers} son todos los usuarios inactivos`);
    await usersService.deleteMany(deleteUsers);

    if (deleteUsers.length >= 1) {
      return res.send({
        status: "Ok",
        message: `Se eliminaron correctamente los usuarios inactivos, en total ${deleteUsers.length}`,
      });
    } else {
      return res.send({
        status: "Ok",
        message: `No se encontraron usuarios inactivos`,
      });
    }
  } catch (error) {
    res.send({
      status: "error",
      message: `Ocurrio un error al intentar eliminar los usuarios inactivos`,
    });
    next(error);
  }
};

module.exports = {
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
  deleteLastConnect,
};

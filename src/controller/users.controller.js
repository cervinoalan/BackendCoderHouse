const usersService = require("../repository/users.service");
const UserDto = require("../dao/DTOs/user.dto");
const local = require("dayjs/locale/ar");
const transport = require("../utils/mailing");
const moment = require("moment");
const { TYPE_DOCUMENTS } = require("../config/config");
const productsService = require("../repository/products.service");

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

const updateRol = async (req, res) => {
  try {
    const id = req.params.uid;
    const newRol = "premium";
    if (req.user.rol === "user") {
      const documents = req.user.documents;
      const uploadedDocuments = documents.filter((document) =>
        TYPE_DOCUMENTS.includes(document.name)
      );

      if (uploadedDocuments.length < 3) {
        return res.json({
          msg: "Para ser usuario premium debe subir la documentacion necesaria",
        });
      }

      const updatedUser = await usersService.updateRol(id, newRol);
      console.log(updatedUser);

      return res.status(200).json({
        status: "success",
        message: `Rol actualizado a ${newRol}`,
        data: updatedUser,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar el rol del usuario",
      error: error.message,
    });
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
        console.log(
          `${deleteUsers} son los usuarios con mas de 30min inactivos`
        );
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

const uploadDocs = async (req, res, next) => {
  try {
    let user = req.user;

    let userDocuments = [];

    user.documents.forEach((element) => {
      userDocuments.push(element.name);
    });

    if (
      userDocuments.findIndex((value) => value == req.body.typeDocument) !=
        -1 &&
      req.body.typeDocument != "product" &&
      req.body.typeDocument != "thumbnail"
    ) {
      return res
        .status(403)
        .send({ status: "error", message: "Archivo ya subido" });
    }
    if (
      userDocuments.findIndex((value) => value == req.body.typeDocument) !=
        -1 &&
      req.body.typeDocument != "document" &&
      req.body.typeDocument != "thumbnail"
    ) {
      return res
        .status(403)
        .send({ status: "error", message: "Archivo ya subido" });
    }

    if (req.body.typeDocument === 'product') {
      const pid = req.body.pid || req.params.pid;
      if (!pid) {
        return res.status(400).send({ status: 'error', message: 'Falta el parámetro pid' });
      }
      await productsService.updateProduct(pid,{thumbnail : `/documents/${req.route}/${req.filename}`});

    }

    await usersService.editOneById(req.user.id, {
      documents: [
        ...req.user.documents,
        {
          name: req.body.typeDocument,
          reference: `/documents/${req.route}/${req.filename}`,
        },
      ],
    });

    res.send({ status: "Ok", message: "Archivos guardados correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  insertUser,
  updateUser,
  updateRol,
  deleteUser,
  deleteLastConnect,
  uploadDocs,
};

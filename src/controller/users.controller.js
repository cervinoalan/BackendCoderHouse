const usersService = require("../repository/users.service");
const UserDto = require("../dao/DTOs/user.dto");

const getUsers = async (req, res) => {
    try {
      const users = await usersService.getUser();
      const usersDto = users.map((user)=> new UserDto(user))
      res.json(usersDto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

const insertUser = async (req, res) => {
  const { user } = req.body;
  const userDTO = new DTOsUser(user);
  const newUser = await usersService.insertUser(userDTO);
  res.json({ msg: 'ok', newUser });
};

const updateUser = async (req, res) => {
  const { id, user } = req.body;
  const updatedUser = await usersService.updateUser(id, user);
  res.json({ msg: 'ok', updatedUser });
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  const deletedUser = await usersService.deleteUser(id);
  res.json({ msg: 'ok', deletedUser });
};



module.exports = {
    getUsers,
    insertUser,
    updateUser,
    deleteUser,
  };
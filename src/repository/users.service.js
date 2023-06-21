// MONGO
const UsersManager = require("../dao/mongoManager/UsersManager");

class UsersService {
  getUser = () => UsersManager.get();
  getUserByEmail = (email) => UsersManager.getByEmail(email);
  insertUser = (user) => UsersManager.insert(user);
  updateUser = (id, user) => UsersManager.update(id,user);
  deleteUser = (id) => UsersManager.delete(id);
  deleteLastConect = (last_connection) => UsersManager.deleteLast(last_connection);
}

module.exports = new UsersService();

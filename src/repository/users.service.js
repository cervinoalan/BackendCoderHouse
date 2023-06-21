// MONGO
const UsersManager = require("../dao/mongoManager/UsersManager");

class UsersService {
  getUser = () => UsersManager.get();
  insertUser = (user) => UsersManager.insert(user);
  updateUser = (id, user) => UsersManager.update(id,user);
  deleteUser = (id) => UsersManager.delete(id);
  deleteLastConect = (last_connection) => UsersManager.deleteLast(last_connection);
}

module.exports = new UsersService();

// MONGO
const UsersManager = require("../dao/mongoManager/UsersManager");

class UsersService {
  getSession = (email, password) => UsersManager.get(email, password);
  getUser = () => UsersManager.get();
  getById = (id) => UsersManager.getById(id);
  getUserByEmail = (email) => UsersManager.getByEmail(email);
  insertUser = (user) => UsersManager.insert(user);
  updateUser = (id, user) => UsersManager.update(id, user);
  deleteUser = (id) => UsersManager.delete(id);
  deleteLastConect = (last_connection) =>
    UsersManager.deleteLast(last_connection);
  updatePassword = (id,newPassword ) =>
    UsersManager.updatePassword(id, newPassword);
}

module.exports = new UsersService();

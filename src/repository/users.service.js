// MONGO
const UsersManager = require("../dao/mongoManager/UsersManager");

class UsersService {
  getSession = (email, password) => UsersManager.get(email, password);
  getUser = () => UsersManager.get();
  getById = (id) => UsersManager.getById(id);
  getUserByEmail = (email) => UsersManager.getByEmail(email);
  insertUser = (user) => UsersManager.insert(user);
  updateUser = (id, user) => UsersManager.update(id, user);
  updateRol = (id, newRol) => UsersManager.updateRol(id, newRol);
  deleteUser = (id) => UsersManager.delete(id);
  lastConnection = (id, last_connection) => UsersManager.lastConnection(id, last_connection);
  deleteLast = (email) => UsersManager.deleteLast(email);
  deleteMany = (users) => UsersManager.deleteMany(users);
  updatePassword = (id, newPassword) => UsersManager.updatePassword(id, newPassword);
  editOneById = (id, params) => UsersManager.editOneById(id, params);
}

module.exports = new UsersService();

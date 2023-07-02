const UserSchema = require("../models/users.model");

class UserManager {
  getSession = async (email, password) => {
    return await UserSchema.findOne({ email, password });
  };

  getUser = (userId) => UserSchema.findById(userId);

  getById = (id) => UserSchema.findById(id);

  getByEmail = (email) => UserSchema.findOne(email);

  insert = (user) => UserSchema.create(user);

  update = (user, id) => UserSchema.findByIdAndUpdate(id, user);

  updateRol = async (id, newRol) => {
    const updatedUser = await UserSchema.findByIdAndUpdate(
      {id},
      { rol: newRol },
      { new: true }
    );
    return updatedUser;
  };

  delete = (id) => UserSchema.findByIdAndDelete(id);

  lastConnection = async (user, lastconnection) => {
    if (user) {
      user.last_connection = lastconnection;
      let result = await UserSchema.findByIdAndUpdate(user._id, {
        last_connection: lastconnection,
      });
      return result;
    } else {
      throw new Error("El objeto de usuario es indefinido.");
    }
  };

  deleteLast = async (email) => {
    let result = await UserSchema.deleteOne({ email: email });
    return result;
  };

  deleteMany = async (users) => {
    users.forEach(async (user) => {
      let result = await UserSchema.deleteOne({ email: user });
      console.log(result);
      return result;
    });
  };

  updatePassword = (id, newPassword) => {
    const result = UserSchema.findByIdAndUpdate({_id:id}, { password: newPassword });
    return result
  };

  editOneById = async (id, params) => {
    let result = UserSchema.findByIdAndUpdate(id, params);
    return result;
  };
}

module.exports = new UserManager();

const UserSchema = require("../models/users.model");

class UserManager {
  get = () => UserSchema.find();

  getById = (id) => UserSchema.findById(id);

  getByEmail = (email) => UserSchema.findOne(email);

  insert = (user) => UserSchema.create(user);

  update = (user, id) => UserSchema.findByIdAndUpdate(id, user);

  updateRol = async (id, newRol) => {
    const updatedUser = await UserSchema.findByIdAndUpdate(
      id,
      { rol: newRol },
      { new: true }
    );
    return updatedUser;
  };

  delete = (id) => UserSchema.findByIdAndDelete(id);

  lastConnection = async (user, lastconnection) => {
    user.last_connection = lastconnection;
    let result = await UserSchema.findByIdAndUpdate(user._id, {
      last_connection: lastconnection,
    });
    return result;
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
    UserSchema.findByIdAndUpdate(id, { password: newPassword });
  };

  editOneById = async (id, params) => {
    let result = UserSchema.findByIdAndUpdate(id, params);
    return result;
  };
}

module.exports = new UserManager();

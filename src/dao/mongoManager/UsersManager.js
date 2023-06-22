const UserSchema = require("../models/users.model");

class UserManager {
  get = () => UserSchema.find();

  getById = (id) => UserSchema.findById(id);

  getByEmail = (email) => UserSchema.findOne(email);

  insert = (user) => UserSchema.create(user);

  update = (user, id) => UserSchema.findByIdAndUpdate(id, user);

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

  updatePassword = (id, newPassword) =>
    UserSchema.findByIdAndUpdate(id, { password: newPassword });
}

module.exports = new UserManager();

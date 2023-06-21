const UserSchema = require("../models/users.model");

class UserManager {
  get = () => UserSchema.find();

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
}

module.exports = new UserManager();

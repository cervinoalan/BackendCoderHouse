const mongoose = require("mongoose");
const usersCollection = "usersLogin";

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  cart: {
    type: [
      {
        cart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "carts",
        },
      },
    ],
  },
  rol: {
    type: String,
    default: "usuario",
  },
});

const UsersModel = mongoose.model(usersCollection, UserSchema);

module.exports = UsersModel;

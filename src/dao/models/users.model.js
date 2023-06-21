const mongoose = require("mongoose");
const usersCollection = "usersLogin";

const roles = ['admin', 'user', 'premium'];

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
  cart: [
    {
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
      },
    },
  ],
  rol: {
    type: String,
    enum: roles,
    required: true,
    default: "user",
  },
  documents: {
    type: [
      {
        name: String,
        reference: String,
      },
    ],
    default: [],
  },
  last_connection: {
    type: String,
    default: Date.now,
  },
});

const UsersModel = mongoose.model(usersCollection, UserSchema);

module.exports = UsersModel;

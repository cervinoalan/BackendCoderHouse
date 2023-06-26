const mongoose = require("mongoose");

const cartsSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    default: 0,
  },
  totalQuantity: {
    type: Number,
    default: 0,
  },
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        unitValue: {
          type: Number,
        },
      },
    ],
    default: [],
  },
});

const cartsModel = mongoose.model("carts", cartsSchema);

module.exports = cartsModel;
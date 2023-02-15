const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    default: 1,
  },
  category: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: Array,
    default: [],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

ProductSchema.plugin(paginate);

const productModel = mongoose.model("products", ProductSchema);

module.exports = productModel;

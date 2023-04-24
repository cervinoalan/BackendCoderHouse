const mongoose = require("mongoose");
const ticketCollection = "ticketsCollection";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  purchase_datatime: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Number,
  },
  purchaser: {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
    },
  },
  products: {
    type: Array,
  },
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);
module.exports = ticketModel;

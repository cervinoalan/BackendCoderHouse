const cartsService = require("../repository/carts.service");
const stripeService = require("../repository/stripe.service");

const paymentProcess = async (req, res) => {
  try {
    const { id } = req.query;
    const cart = await cartsService.getCartById(id);
    if (!cart) {
      return res.status(404).send("cart not found");
    }
    const config = {
      amount: cart.totalPrice,
      currency: "usd",
    };
    const paymentIntent = await stripeService.createPaymentIntents(config);
    res.send({
      status: "success",
      payload: paymentIntent,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  paymentProcess,
};

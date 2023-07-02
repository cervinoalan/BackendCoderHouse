const { default: Stripe } = require("stripe");
const { PRIVATE_KEY_STRIPE } = require("../config/config");

class StripeService {
  constructor() {
    this.stripe = new Stripe(PRIVATE_KEY_STRIPE);
  }

  createPaymentIntents(data) {
    return this.stripe.paymentIntents.create(data);
  }
}

module.exports = new StripeService();

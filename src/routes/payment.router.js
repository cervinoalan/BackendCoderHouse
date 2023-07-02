const { Router } = require("express");
const paymentController = require("../controller/payment.controller");
const router = Router();

router.post("/payment-intents", paymentController.paymentProcess);

module.exports = router;

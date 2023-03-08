const { Router } = require("express");
const passport = require("passport");
const router = Router();
const sessionController = require("../controller/session.controller");
const { STRATEGY_REGISTER, LOGIN_STRATEGY } = require("./utils/constants");

router.post(
  "/login",
  passport.authenticate(LOGIN_STRATEGY),
  sessionController.login
);

router.post(
  "/register",
  passport.authenticate(STRATEGY_REGISTER),
  sessionController.register
);

router.post("/logout", sessionController.logout);

module.exports = router;

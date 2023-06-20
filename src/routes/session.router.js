const { Router } = require("express");
const passport = require("passport");
const router = Router();
const sessionController = require("../controller/session.controller");
const { LOGIN_STRATEGY, REGISTER_STRATEGY } = require("../config/config");
const { userAdmin } = require("../utils/userStatus");

router.post(
  "/login",
  passport.authenticate(LOGIN_STRATEGY),
  sessionController.login
);

router.post(
  "/register",
  passport.authenticate(REGISTER_STRATEGY),
  sessionController.register
);

router.post("/logout", sessionController.logout);

router.get("/current", userAdmin, sessionController.current);

router.get('/forgotpassword',sessionController.forgotPassword);

module.exports = router;

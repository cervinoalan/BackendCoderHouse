const { Router } = require('express');
const router = Router();
const sessionController = require("../controller/session.controller")

router.post('/login', sessionController.login);

router.post('/register', sessionController.register);

router.post("/logout", sessionController.logout);

module.exports = router;
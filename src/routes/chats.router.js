const { Router } = require("express");
const chatsController = require("../controller/chat.controller");
const { userLogged } = require("../utils/userStatus");

const router = Router();

router.get("/", chatsController.getMessage);

router.post("/",userLogged, chatsController.sendMessage);

module.exports = router;

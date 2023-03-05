const { Router } = require("express");
const chatsController = require("../controller/chat.controller");

const router = Router();

router.get("/", chatsController.getMessage);

router.post("/", chatsController.sendMessage);

module.exports = router;

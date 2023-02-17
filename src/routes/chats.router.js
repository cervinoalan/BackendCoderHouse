const { Router } = require("express");
const ChatManager = require("../dao/mongoManager/ChatManager");
const { emitAddMessage } = require("../routes/utils/socket.io");
const router = Router();
const cm = new ChatManager();

router.get("/", async (req, res) => {
    try {
        const messages = await cm.getMessages()
        res.json({
            msg: "Mensajes encontrados",
            status: "success",
            payload: messages,
          });
    } catch (error) {
        res.status(500).json({
        msg: `Ocurrio un error al intentar buscar el/los mensajes`,
        status: "error",
        });
    }
});

router.post("/", async (req, res) => {
  const message = req.body;
  try {
    const messageSaved = await cm.sendMessage(message);
    res.json({
      msg: "Mensaje enviado",
      status: "success",
      payload: messageSaved,
    });
    emitAddMessage(message);
  } catch (error) {
    res.status(500).json({
      msg: `Ocurrio un error al enviar el mensaje`,
      status: "error",
    });
  }
});

module.exports = router;

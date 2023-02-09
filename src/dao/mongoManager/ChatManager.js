const chatModel = require("../models/messages.model");

class ChatManager {
  sendMessage = async (message) => {
    try {
      const messageSaved = await chatModel.create(message);
      return messageSaved;
    } catch (e) {
      console.log(e);
    }
  };

  getMessages = async () => {
    try {
      const messages = await chatModel.find();
      return messages;
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        playload: "Error al buscar los mensajes",
      });
    }
  };
}

module.exports = ChatManager;

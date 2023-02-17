const chatModel = require("../models/messages.model");

class ChatManager {
  sendMessage = async (message) => {
    const messageSaved = await chatModel.create(message);
    return messageSaved;
  };

  getMessages = async () => {
    const messages = await chatModel.find();
    return messages;
  };
}

module.exports = ChatManager;

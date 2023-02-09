const socket = require("socket.io");
const ProductManager = require("../../dao/mongoManager/ProductManager");
const ChatManager = require('../../dao/mongoManager/ChatManager')

const productManager = new ProductManager()
const chatManager = new ChatManager()

let io;

const connectSocket = (httpServer) => {
  io = socket(httpServer);
  io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado!");
    const products = await productManager.getProducts();
    const chats = await chatManager.getMessages()
    socket.emit("init-products", { products });
    socket.emit('init-chats', { chats })
  });
};

const emitDeleteProduct = (id) => {
  console.log(`El producto con el id: ${id} fue eliminado`);
  io.emit("delete-product", { id });
};

const emitAddProduct = (data) => {
  console.log(`Se ha agregado el producto: ${data.title}`);
  io.emit("add-product", { data });
};

const emitAddMessage = (newMessage) => {
	console.log(`Se ha enviado un nuevo mensaje: ${JSON.stringify(newMessage)}`)
	io.emit('add-message', newMessage)
}

module.exports = { connectSocket, emitDeleteProduct, emitAddProduct, emitAddMessage };

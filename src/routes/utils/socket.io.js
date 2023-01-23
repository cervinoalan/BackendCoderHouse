const socket = require("socket.io");
const productManager = require("./ProductManager");

let io;

const connectSocket = (httpServer) => {
  let io = socket(httpServer);
  io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado!");
    const products = await productManager.getProducts();
    socket.emit("init-products", { products });
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

module.exports = { connectSocket, emitDeleteProduct, emitAddProduct };

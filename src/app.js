const express = require("express");
const cartsRouter = require("./routes/carts.router");
const productRouter = require("./routes/products.router");
const handlebars = require("express-handlebars");
const viewsRouter = require("./routes/views.router");
const app = express();
const { connectSocket } = require("./routes/utils/socket.io");
const mongoose = require("mongoose");
const chatsRouter = require("./routes/chats.router");
const PORT = 8080;

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

//express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use("/api/products", productRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//socket.io
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor ejecutado en puerto: ${PORT}`);
});

//mongoose
mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://admin:uFpp5fwiUQpikQrx@cluster0.cdoqp1h.mongodb.net/?retryWrites=true&w=majority",

  (error) => {
    if (error) {
      console.log("Error de conexion", error);
      process.exit();
    } else {
      console.log("Conexion con la base de datos exitosa");
    }
  }
);

connectSocket(httpServer);

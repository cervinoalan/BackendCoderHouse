const express = require("express");
const cartsRouter = require("./routes/carts.router");
const productRouter = require("./routes/products.router");
const handlebars = require("express-handlebars");
const viewsRouter = require("./routes/views.router");
const app = express();
const {connectSocket} = require("./routes/utils/socket.io")
const mongoose = require("mongoose")

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

//rutas
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//socket.io
const httpServer = app.listen(8080, () => {
  console.log("Servidor ejecutado en puerto 8080");
});

//mongoose
mongoose.set('strictQuery', false)
mongoose.connect(
	'mongodb+srv://admin:uFpp5fwiUQpikQrx@cluster0.cdoqp1h.mongodb.net/?retryWrites=true&w=majority',

	(error) => {
		if (error) {
			console.log('Error de conexion', error)
			process.exit()
		} else {
			console.log('Conexion exitosa')
		}
	}
)

connectSocket(httpServer)
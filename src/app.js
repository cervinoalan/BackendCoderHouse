const express = require("express");
const cartsRouter = require("./routes/carts.router");
const productRouter = require("./routes/products.router");
const handlebars = require("express-handlebars");
const viewsRouter = require("./routes/views.router");
const { connectSocket } = require("./routes/utils/socket.io");
const mongoose = require("mongoose");
const chatsRouter = require("./routes/chats.router");
const PORT = 8080;
const session = require("express-session");
const MongoConnect = require("connect-mongo");
const sessionRouter = require("./routes/session.router");
const InitPassport = require("./routes/utils/passport.config");
const passport = require("passport");

//init
const app = express();

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//session
app.use(
  session({
    store: MongoConnect.create({
      mongoUrl:
        "mongodb+srv://admin:uFpp5fwiUQpikQrx@cluster0.cdoqp1h.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 300,
    }),
    secret: "DASDSADSADVFGDDFBGFDBDGB",
    resave: true,
    saveUninitialized: true,
  })
);

//passport
InitPassport();
app.use(passport.initialize());
app.use(passport.session());

//express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//rutas
app.use("/api/products", productRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/session", sessionRouter);

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

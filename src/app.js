const { PORT, MONGO_URL, SECRET } = require("./config/config");
const express = require("express");
const cartsRouter = require("./routes/carts.router");
const productRouter = require("./routes/products.router");
const handlebars = require("express-handlebars");
const viewsRouter = require("./routes/views.router");
const { connectSocket } = require("./utils/socket.io");
const mongoose = require("mongoose");
const chatsRouter = require("./routes/chats.router");
const session = require("express-session");
const MongoConnect = require("connect-mongo");
const sessionRouter = require("./routes/session.router");
const InitPassport = require("./utils/passport.config");
const passport = require("passport");
const mockingRouter = require("./routes/mocking.router");
const mdwError = require("./utils/errors/errorMdw");
const mdwLogger = require("./config/logger");
const loggerRouter = require("./routes/loggerTest.router");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const usersRouter = require("./routes/users.router");
const paymentRouter = require("./routes/payment.router");

//init
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
}));

const configSwagger = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      description: "API Eccomerce",
    },
  },
  apis: [`${__dirname}/docs/**/*.yml`],
};

const spec = swaggerJsDoc(configSwagger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//session
app.use(
  session({
    store: MongoConnect.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 5000,
    }),
    secret: SECRET,
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

//mdw Logger
app.use(mdwLogger);

//rutas
app.use("/api/products", productRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/session", sessionRouter);
app.use("/api/mockingproducts", mockingRouter);
app.use("/loggerTest", loggerRouter);
app.use("/api/users", usersRouter);
app.use("/api/payments", paymentRouter);

//mdw control de errores
app.use(mdwError);

//socket.io
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor ejecutado en puerto: ` + PORT);
});

//mongoose
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_URL,

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

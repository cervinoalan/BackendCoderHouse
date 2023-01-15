const express = require("express");
const cartsRouter = require("./routes/carts.router");
const productRouter = require("./routes/products.router");
const app = express();

app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, () => {
  console.log("servidor ejecutado en puerto 8080");
});

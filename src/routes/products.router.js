const { Router } = require("express");
const router = Router();
const productController = require("../controller/products.controller");
const multerUtils = require("../multer.utils");
const { userAdmin } = require("./utils/userStatus");

router.get("/", productController.getProducts);

router.get("/:pid", productController.getProductById);

router.post("/", multerUtils.single("thumbnail"), productController.addProduct);

router.put("/:pid",userAdmin, productController.updateProduct);

router.delete("/:pid",userAdmin, productController.deleteProduct);

module.exports = router;

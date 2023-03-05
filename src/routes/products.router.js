const { Router } = require("express");
const router = Router();
const productController = require("../controller/products.controller");
const multerUtils = require("../multer.utils");

router.get("/", productController.getProducts);

router.get("/:pid", productController.getProductById);

router.post("/", multerUtils.single("thumbnail"), productController.addProduct);

router.put("/:pid", productController.updateProduct);

router.delete("/:pid", productController.deleteProduct);

module.exports = router;

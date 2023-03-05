const { Router } = require("express");
const router = Router();
const cartController = require("../controller/carts.controller");

router.post("/", cartController.createCarts);

router.get("/", cartController.getCarts);

router.get("/:cid", cartController.getCartByUsername);

router.post("/:cid/product/:pid", cartController.addProductToCart);

router.delete("/:cid/product/:pid", cartController.deleteProductFromCart);

router.put("/:cid", cartController.updateProductFromCart);

router.put("/:cid/product/:pid", cartController.updateProductQuantityFromCart);

router.delete("/:cid", cartController.cleanCart);

module.exports = router;

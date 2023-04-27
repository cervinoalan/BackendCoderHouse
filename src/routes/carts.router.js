const { Router } = require("express");
const router = Router();
const cartController = require("../controller/carts.controller");
const { userLogged } = require("../utils/userStatus");

router.post("/", cartController.createCarts);
router.get("/", cartController.getCarts);
router.get("/:cid", cartController.getCartByUsername);
router.post("/:cid/product/:pid",userLogged, cartController.addProductToCart);
router.delete("/:cid/product/:pid", cartController.deleteProductFromCart);
router.put("/:cid",userLogged, cartController.updateProductFromCart);
router.put("/:cid/product/:pid",userLogged, cartController.updateProductQuantityFromCart);
router.delete("/:cid", cartController.cleanCart);
router.get("/:cid/purchase",userLogged, cartController.purchaseCart);


module.exports = router;

const { Router } = require("express");
const viewController = require("../controller/views.controller");

const router = Router();

router.get("/realtimeproducts", viewController.getRealTimeProducts);

router.get("/chats", viewController.renderChats);

router.get("/products", viewController.renderGetProducts);

router.get("/carts/:cid", viewController.renderCart);

router.get("/", viewController.renderLogin);

router.get("/register", viewController.renderRegister);

router.get("/perfil", viewController.renderPerfil);

router.get("/forgotpassword", viewController.renderForgotPass);

router.get("/forgotrecovery", viewController.renderForgotRecovery);

module.exports = router;

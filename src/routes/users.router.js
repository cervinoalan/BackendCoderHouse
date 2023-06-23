const { Router } = require('express');
const router = Router();
const userController = require("../controller/users.controller")
const { userAdmin } = require("../utils/userStatus");

router.get('/', userController.getUsers);
router.post('/', userController.insertUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);
router.delete('/deletelast', userAdmin, userController.deleteLastConnect);

module.exports = router;
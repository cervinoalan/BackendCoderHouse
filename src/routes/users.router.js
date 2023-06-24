const { Router } = require('express');
const router = Router();
const userController = require("../controller/users.controller")
const { userAdmin } = require("../utils/userStatus");
const { saveDocs } = require('../multer.utils');

router.get('/', userController.getUsers);
router.post('/', userController.insertUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);
router.delete('/deletelast', userAdmin, userController.deleteLastConnect);
router.post('/premium/:uid', userController.updateRol);
router.post('/:uid/documents', saveDocs, userController.uploadDocs);

module.exports = router;
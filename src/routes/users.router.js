const { Router } = require('express');
const { getUsers } = require('../controller/users.controller');
const router = Router();

router.get('/', getUsers);
router.post('/', insertUser);
router.put('/', updateUser);
router.delete('/', deleteUser);
// router.delete('/deletelast', deleteLastConect);

module.exports = router;
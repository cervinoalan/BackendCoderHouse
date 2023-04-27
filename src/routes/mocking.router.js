const { Router } = require('express');
const mockingController = require('../controller/mockingProducts.controller.');

const router = Router();

router.get('/', mockingController.getMocking);

module.exports = router;
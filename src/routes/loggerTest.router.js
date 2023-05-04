const { Router } = require('express');
const loggerTest = require('../controller/loggerTest.controller');

const router = Router();

router.get('/', loggerTest);

module.exports = router;
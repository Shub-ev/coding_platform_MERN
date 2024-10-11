const { testController } = require('../controllers/index');
const express = require('express');

const router = express.Router();

router
    .post('/createTest', testController.createTest);

router
    .post('/checkTest', testController.checkTest);

module.exports = router;
const { testController } = require('../controllers/index');
const express = require('express');

const router = express.Router();

router
    .post('/createTest', testController.createTest)
    .get('/getTests', testController.getTests)
    .post('/checkPass', testController.checkPassword)

router
    .post('/checkTest', testController.checkTest);

module.exports = router;
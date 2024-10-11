const express = require('express');
const { authController } = require('../controllers/');

const router = express.Router();

router
    .post('/createUser', authController.createUser);

router
    .post('/login', authController.loginUser);

router
    .post('/createTest')

module.exports = router;
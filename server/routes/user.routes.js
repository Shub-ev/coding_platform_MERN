const express = require('express');
const { getUserReq } = require('../controllers/user.controller');

const router = express.Router();

router
    .get('/home', getUserReq)


module.exports.userRouter = router;
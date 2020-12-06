const express = require("express");

const chatController = require('../conroller/Chat');
const isAuth=require("../middleware/auth");


const router = express.Router();

router.post('/Sendmassage',isAuth, chatController.sendMassage);

router.get('/getMassages/:ChatterId', isAuth,chatController.getMassages);

module.exports = router;
const express = require("express");

const reqController = require('../conroller/req');

const router = express.Router();
const isAuth=require("../middleware/auth");


router.post('/sendreq', isAuth, reqController.sentFrndReq);

router.post('/acceptReq', isAuth,reqController.acceptReq);

router.post('/cancleReq',isAuth, reqController.cancleReq);

router.post('/unfrnd',isAuth, reqController.unfrndReq);


module.exports = router;
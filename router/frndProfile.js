const express = require("express");

const frndProfileController = require('../conroller/frndProfile');
const isAuth=require("../middleware/auth");


const router = express.Router();

router.get('/openfrndProfile/:frndId',isAuth, frndProfileController.openfrndProfile);

module.exports = router;
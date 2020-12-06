const express = require("express");

const photoController = require('../conroller/Photo');
const isAuth=require("../middleware/auth");


const router = express.Router();

router.post('/uploadProfilePhoto',isAuth, photoController.profilePhotoUpload);

router.post('/removeProfilePhoto', isAuth,photoController.removeProfilePhoto);



router.post('/uploadTimelinePhoto', isAuth,photoController.uploadTimelinePhoto);

router.post('/uploadTimelinePhotoorchaption', isAuth,photoController.uploadTimelinePhotoorchaption);





module.exports = router;
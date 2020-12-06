const express = require("express");

const aboutController = require("../conroller/About");

const isAuth=require("../middleware/auth");

const router = express.Router();

router.post("/AboutProfession",isAuth, aboutController.AboutProfession);

router.post("/AboutWorkPlace", isAuth,aboutController.AboutWorkPlace);

router.post("/AboutCollege",isAuth, aboutController.AboutCollege);

router.post("/AboutCity",isAuth, aboutController.AboutCity);

router.post("/AboutHomeTown",isAuth, aboutController.AboutHomeTown);

router.post("/AboutMobileNumber",isAuth, aboutController.AboutMobileNumber);

router.post("/AboutDateofBith",isAuth, aboutController.AboutDateofBith);

router.post("/AboutGender",isAuth, aboutController.AboutGender);

router.post(
  "/AboutRelationshipStatus",isAuth,
  aboutController.AboutRelationshipStatus
);

router.post("/changePasswordOP",isAuth, aboutController.changePassword);

router.post("/delAccountfromprofile",isAuth, aboutController.delAccountfromprofile);

router.post("/changeEmailProfile",isAuth, aboutController.changeEmailProfile);

router.post(
  "/ConfirmOTPforChangeEmail",isAuth,
  aboutController.ConfirmOTPforChangeEmail
);

module.exports = router;

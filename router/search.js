const express = require("express");

const searchController = require("../conroller/search");

const isAuth = require("../middleware/auth");

const router = express.Router();

router.post("/searchbyNameorEmail", isAuth, searchController.searchController);

module.exports = router;
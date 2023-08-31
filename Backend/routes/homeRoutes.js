const express = require("express");
const router = express.Router();

const { getLatestModels } = require("../controllers/homeController");

router.get("/getLatestModels", getLatestModels);

module.exports = router;

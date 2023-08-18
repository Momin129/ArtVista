const express = require("express");
const router = express.Router();

const { getNumbers } = require("../controllers/adminControllers");

router.get("/getNumbers", getNumbers);

module.exports = router;

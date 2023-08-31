const express = require("express");
const router = express.Router();

const {
  getNumbers,
  getAllDetails,
} = require("../controllers/adminControllers");

router.get("/getNumbers", getNumbers);
router.get("/getAllDetails", getAllDetails);
module.exports = router;

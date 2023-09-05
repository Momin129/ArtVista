const express = require("express");
const {
  searchModels,
} = require("../controllers/models/searchModelControllers");

const router = express.Router();

router.get("/searchedModel", searchModels);

module.exports = router;

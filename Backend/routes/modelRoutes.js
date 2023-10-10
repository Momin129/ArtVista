const express = require("express");
const {
  searchModels,
} = require("../controllers/models/searchModelControllers");
const {
  getModelList,
  getModel,
} = require("../controllers/models/getModelController");

const router = express.Router();

router.get("/searchedModel", searchModels);
router.get("/getModelList", getModelList);
router.get("/model/:filename", getModel);

module.exports = router;

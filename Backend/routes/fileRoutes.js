const express = require("express");
const {
  upload,
  addModel,
  getModelsData,
  getModel,
  removeModel,
} = require("../controllers/fileController");

const router = express.Router();

router.post("/upload", upload.single("file"), addModel);
router.get("/getmodels", getModelsData);
router.get("/getmodel", getModel);
router.get("/removeModel", removeModel);

module.exports = router;

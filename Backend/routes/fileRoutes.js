const express = require("express");
const { upload, addModel } = require("../controllers/fileController");

const router = express.Router();

router.post("/upload", upload.single("file"), addModel);

module.exports = router;

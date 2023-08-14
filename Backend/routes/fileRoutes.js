const express = require("express");
const { upload } = require("../controllers/fileController");

const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  console.log("Done");
});

module.exports = router;

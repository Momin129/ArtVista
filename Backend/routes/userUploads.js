const { upload, getUserUploads } = require("../controllers/userUploads");

const express = require("express");
const router = express.Router();

router.post("/uploadImages", upload.array("images"), (req, res) => {
  res.json(req.files);
});
router.get("/", getUserUploads);
module.exports = router;

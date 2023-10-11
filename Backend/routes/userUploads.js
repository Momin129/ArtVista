const {
  upload,
  getUserUploads,
  uploadImages,
} = require("../controllers/users/userUploads");

const express = require("express");
const router = express.Router();

router.post("/uploadImages", upload.array("files"), uploadImages);
router.get("/", getUserUploads);

module.exports = router;

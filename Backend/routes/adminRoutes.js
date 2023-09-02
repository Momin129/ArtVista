const express = require("express");
const router = express.Router();

const {
  getNumbers,
  getAllDetails,
  getUploadRequest,
  getUploadEmail,
  aproveRequest,
  rejectRequest,
} = require("../controllers/adminControllers");

router.get("/getNumbers", getNumbers);
router.get("/getAllDetails", getAllDetails);
router.get("/uploadRequest", getUploadRequest);
router.get("/uploadEmail", getUploadEmail);
router.post("/aproveRequest", aproveRequest);
module.exports = router;

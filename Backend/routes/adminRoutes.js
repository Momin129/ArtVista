const express = require("express");
const router = express.Router();

const {
  getNumbers,
  getAllDetails,
  getUploadRequest,
  getUploadEmail,
  aproveRequest,
  getFeedbacks,
  sendReply,
  updateDetails,
} = require("../controllers/adminControllers");

router.get("/getNumbers", getNumbers);
router.get("/getAllDetails", getAllDetails);
router.get("/uploadRequest", getUploadRequest);
router.get("/uploadEmail", getUploadEmail);
router.get("/getFeedbacks", getFeedbacks);
router.post("/aproveRequest", aproveRequest);
router.post("/sendReply", sendReply);
router.post("/updateDetails", updateDetails);
module.exports = router;

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
  rejectRequest,
} = require("../controllers/admin/adminControllers");
const {
  upload,
  uploadModel,
  getModel,
  deleteModel,
} = require("../controllers/admin/adminUploadControllers");
const {
  downloadZip,
  updateModel,
} = require("../controllers/admin/adminUserUploadsController");

router.get("/getNumbers", getNumbers);
router.get("/getAllDetails", getAllDetails);
router.get("/uploadRequest", getUploadRequest);
router.get("/uploadEmail", getUploadEmail);
router.get("/getFeedbacks", getFeedbacks);
router.post("/aproveRequest", aproveRequest);
router.post("/rejectRequest", rejectRequest);
router.post("/sendReply", sendReply);
router.post("/updateDetails", updateDetails);
router.post("/updateUserModel", updateModel);
router.post("/uploadModel", upload.single("file"), uploadModel);
router.get("/file:filename", getModel);
router.post("/deleteModel", deleteModel);
router.get("/downloadZip", downloadZip);

module.exports = router;

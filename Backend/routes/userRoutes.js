const express = require("express");
const router = express.Router();
const {
  register,
  emailMobileExists,
  login,
  verifyUser,
  getUserDetails,
  updateUserDetails,
  changePassword,
  sendOTP,
} = require("../controllers/users/userControllers");

router.post("/register", register);
router.post("/validate", emailMobileExists);
router.post("/login", login);
router.post("/verify", verifyUser);
router.get("/getUserDetails", getUserDetails);
router.post("/updateUserDetails", updateUserDetails);
router.post("/changePassword", changePassword);
router.post("/sendOTP", sendOTP);
module.exports = router;

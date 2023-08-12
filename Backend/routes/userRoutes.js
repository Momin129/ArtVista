const express = require("express");
const router = express.Router();
const {
  register,
  emailMobileExists,
  login,
  verifyUser,
} = require("../controllers/userControllers");

router.post("/register", register);
router.post("/validate", emailMobileExists);
router.post("/login", login);
router.post("/verify", verifyUser);

module.exports = router;

const express = require("express");
const {
  signup,
  login,
  me,
  forgetPassword,
  resetPassword,
} = require("../controllers/auth");
const {
  validateSignup,
  validateLogin,
  validateNewPassword,
  validateRequest,
} = require("../middleware/validators/auth");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/signup", validateSignup, validateRequest, signup);
router.post("/login", validateLogin, validateRequest, login);
router.get("/me", authMiddleware, me);
router.post("/forgot-password", forgetPassword);
router.put(
  "/reset-password",
  validateNewPassword,
  validateRequest,
  resetPassword
);

module.exports = router;

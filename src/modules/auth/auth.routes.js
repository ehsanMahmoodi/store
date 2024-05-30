const { Router } = require("express");
const { AuthController } = require("./auth.controller");

const router = Router();
router.post("/send-otp", AuthController.sendOtp);
router.post("/check-otp", AuthController.checkOtp);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout/:id", AuthController.logout);
module.exports = {
  AuthRouter: router,
};

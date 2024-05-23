const { Router } = require("express");
const { AuthController } = require("./auth.controller");

const router = Router();
router.post("/send-otp", AuthController.sendOtp);
router.post("/check-otp", AuthController.checkOtp);
router.post("/refresh-token", AuthController.refreshToken);
module.exports = {
  AuthRouter: router,
};

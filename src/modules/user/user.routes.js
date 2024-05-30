const { Router } = require("express");
const { UserController } = require("./user.controller");
const { Authorization } = require("../../common/guard/authorization.guard");
const { uploadFile } = require("../../configs/multer.config");

const router = Router();
router.get("/get-profile/:id", Authorization, UserController.getProfile);
router.post(
  "/profile-update/:id",
  Authorization,
  uploadFile("avatar", "image").single("avatar"),
  UserController.updateProfile,
);
module.exports = {
  UserRouter: router,
};

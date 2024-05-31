const { Router } = require("express");
const { BlogController } = require("./blog.controller");
const { uploadFile } = require("../../configs/multer.config");
const { Authorization } = require("../../common/guard/authorization.guard");

const router = Router();
router.post(
  "/new",
  Authorization,
  uploadFile("blog", "image").single("image"),
  BlogController.create,
);
router.get("/get", BlogController.get);
module.exports = {
  BlogRouter: router,
};

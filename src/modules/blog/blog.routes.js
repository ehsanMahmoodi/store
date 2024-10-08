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
router.patch(
  "/update/:id",
  Authorization,
  uploadFile("blog", "image").single("image"),
  BlogController.update,
);
router.delete("/remove/:id", Authorization, BlogController.remove);
module.exports = {
  BlogRouter: router,
};

const { Router } = require("express");
const { CourseController } = require("./course.controller");
const { Authorization } = require("../../common/guard/authorization.guard");
const { uploadFile } = require("../../configs/multer.config");

const router = Router();
router.post(
  "/new",
  Authorization,
  uploadFile("course", "image").array("images", 5),
  CourseController.create,
);
module.exports = {
  CourseRouter: router,
};

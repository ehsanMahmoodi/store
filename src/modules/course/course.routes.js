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
router.patch(
  "/update/:id",
  Authorization,
  uploadFile("course", "image").array("images", 5),
  CourseController.update,
);
router.get("/get", CourseController.getAll);
router.get("/get/:id", Authorization, CourseController.getOneCourse);
router.delete("/remove/:id", Authorization, CourseController.remove);
module.exports = {
  CourseRouter: router,
};

const { Router } = require("express");
const { Authorization } = require("../../common/guard/authorization.guard");
const { uploadFile } = require("../../configs/multer.config");
const { ProductController } = require("./product.controller");

const router = Router();
router.post(
  "/create",
  Authorization,
  uploadFile("products", "image").array("images", 10),
  ProductController.create,
);
router.get("/get", ProductController.get);
module.exports = {
  ProductRouter: router,
};

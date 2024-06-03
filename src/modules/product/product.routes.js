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
router.patch(
  "/update/:id",
  uploadFile("products", "image").array("images", 10),
  ProductController.update,
);
router.delete("/remove/:id", ProductController.remove);
module.exports = {
  ProductRouter: router,
};

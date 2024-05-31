const { Router } = require("express");
const { CategoryController } = require("./category.controller");

const router = Router();
router.post("/new", CategoryController.create);
router.get("/get", CategoryController.getAll);
router.get("/find/:id", CategoryController.find);
router.patch("/update/:id", CategoryController.update);
router.delete("/remove/:id", CategoryController.remove);
module.exports = {
  CategoryRouter: router,
};

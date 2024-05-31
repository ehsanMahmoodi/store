const { Router } = require("express");
const { CategoryController } = require("./category.controller");
const { Authorization } = require("../../common/guard/authorization.guard");

const router = Router();
router.post("/new", Authorization, CategoryController.create);
router.get("/get", CategoryController.getAll);
router.get("/find/:id", CategoryController.find);
router.patch("/update/:id", Authorization, CategoryController.update);
router.delete("/remove/:id", Authorization, CategoryController.remove);
module.exports = {
  CategoryRouter: router,
};

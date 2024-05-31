const { Router } = require("express");
const { CategoryController } = require("./category.controller");

const router = Router();
router.post("/new", CategoryController.create);
router.get("/get", CategoryController.getAll);
router.get("/find/:id", CategoryController.find);
module.exports = {
  CategoryRouter: router,
};

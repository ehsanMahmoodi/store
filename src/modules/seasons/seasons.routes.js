const { Router } = require("express");
const { SeasonsController } = require("./seasons.controller");
const { Authorization } = require("../../common/guard/authorization.guard");

const router = Router();
router.post("/new", Authorization, SeasonsController.create);
router.patch("/update/:id", Authorization, SeasonsController.update);
router.delete("/remove/:id", SeasonsController.remove);
router.get("/get-all/:id", SeasonsController.getAll);
module.exports = {
  SeasonsRouter: router,
};

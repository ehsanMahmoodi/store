const { Router } = require("express");
const { SeasonsController } = require("./seasons.controller");

const router = Router();
router.post("/new", SeasonsController.create);
module.exports = {
  SeasonsRouter: router,
};

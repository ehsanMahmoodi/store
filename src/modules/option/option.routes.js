const { Router } = require("express");
const { OptionController } = require("./option.controller");

const router = Router();
router.post("/create", OptionController.create);
router.get("/get", OptionController.get);
module.exports = {
  OptionRouter: router,
};

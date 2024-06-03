const { Router } = require("express");
const { OptionController } = require("./option.controller");

const router = Router();
router.post("/create", OptionController.create);
module.exports = {
  OptionRouter: router,
};

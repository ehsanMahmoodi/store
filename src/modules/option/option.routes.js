const { Router } = require("express");
const { OptionController } = require("./option.controller");

const router = Router();
router.post("/create", OptionController.create);
router.get("/get", OptionController.get);
router.patch("/update/:id", OptionController.update);
router.delete("/remove/:id", OptionController.remove);
module.exports = {
  OptionRouter: router,
};

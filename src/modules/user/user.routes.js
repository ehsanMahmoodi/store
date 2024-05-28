const { Router } = require("express");
const { UserController } = require("./user.controller");
const { Authorization } = require("../../common/guard/authorization.guard");

const router = Router();
router.get("/get-profile/:id", Authorization, UserController.getProfile);
module.exports = {
  UserRouter: router,
};

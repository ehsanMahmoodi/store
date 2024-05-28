const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");

const router = Router();
router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
module.exports = {
  MainRouter: router,
};

const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");

const router = Router();
router.use("/auth", AuthRouter);
module.exports = {
  MainRouter: router,
};

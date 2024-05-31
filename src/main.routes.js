const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");
const { CategoryRouter } = require("./modules/category/category.routes");
const { BlogRouter } = require("./modules/blog/blog.routes");

const router = Router();
router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/category", CategoryRouter);
router.use("/blog", BlogRouter);
module.exports = {
  MainRouter: router,
};

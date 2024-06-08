const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");
const { CategoryRouter } = require("./modules/category/category.routes");
const { BlogRouter } = require("./modules/blog/blog.routes");
const { ProductRouter } = require("./modules/product/product.routes");
const { OptionRouter } = require("./modules/option/option.routes");
const { CourseRouter } = require("./modules/course/course.routes");
const { SeasonsRouter } = require("./modules/seasons/seasons.routes");

const router = Router();
router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/category", CategoryRouter);
router.use("/blog", BlogRouter);
router.use("/product", ProductRouter);
router.use("/option", OptionRouter);
router.use("/course", CourseRouter);
router.use("/season", SeasonsRouter);
module.exports = {
  MainRouter: router,
};

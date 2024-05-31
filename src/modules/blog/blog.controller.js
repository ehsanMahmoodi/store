const autoBind = require("auto-bind");
const { BlogService } = require("./blog.service");
const HttpCodes = require("http-status-codes");
const { CategoryMessages } = require("../category/category.messages");
const path = require("path");
const { getImageFromRequest } = require("../../common/utils/functions");
const { createBlogValidation } = require("./blog.validations");
class BlogController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = BlogService;
  }
  async create(req, res, next) {
    try {
      const {
        body: { title, description, body, category_id },
      } = req;
      let image;
      if (req?.fileUploadPath && req?.fileName)
        image = getImageFromRequest(req?.fileName, req?.fileUploadPath);
      await createBlogValidation.validateAsync({
        title,
        description,
        body,
        category_id,
      });
      await this.#service.create({
        title,
        description,
        body,
        image,
        category_id,
        author: req?.user?._id,
      });
      res.status(HttpCodes.CREATED).send({
        statusCode: res.statusCode,
        data: {
          message: CategoryMessages.Created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async get(req, res, next) {
    try {
      const {
        query: { search },
      } = req;
      const blogs = await this.#service.get(search);
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          blogs,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { BlogController: new BlogController() };

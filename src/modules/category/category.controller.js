const autoBind = require("auto-bind");
const { CategoryService } = require("./category.service");
const HttpCodes = require("http-status-codes");
const { CategoryMessages } = require("./category.messages");
const { createCategoryValidation } = require("./category.validations");
class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = CategoryService;
  }
  async create(req, res, next) {
    try {
      const {
        body: { fa_name, en_name, slug, icon, parent },
      } = req;
      await createCategoryValidation.validateAsync({
        fa_name,
        en_name,
        parent,
        slug,
      });
      await this.#service.create({
        fa_name,
        en_name,
        slug,
        icon,
        parent,
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
  async getAll(req, res, next) {
    try {
      const categories = await this.#service.getAll();
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const {
        params: { id },
      } = req;
      const categories = await this.#service.findCategoryById(id);
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { CategoryController: new CategoryController() };

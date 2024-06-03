const autoBind = require("auto-bind");
const { ProductService } = require("./product.service");
const { ProductMessages } = require("./product.messages");
const HttpCodes = require("http-status-codes");
const { createProductValidation } = require("./product.validations");
const { ListOfImagesFromRequest } = require("../../common/utils/functions");
class ProductController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = ProductService;
  }
  async create(req, res, next) {
    try {
      const {
        body: {
          name,
          description,
          price,
          discount_code,
          discount_percentage,
          stock,
          category_id,
          status,
          seller_id,
          tags,
          type,
        },
      } = req;
      await createProductValidation.validateAsync({
        name,
        description,
        price,
        discount_percentage,
        stock,
        category_id,
        status,
        seller_id,
        type,
      });
      let images;
      if (req.fileUploadPath && req.files)
        images = ListOfImagesFromRequest(req.files, req.fileUploadPath);
      await this.#service.create({
        author: req?.user?._id,
        name,
        description,
        price,
        discount_code,
        discount_percentage,
        stock,
        category_id,
        status,
        seller_id,
        tags,
        images,
        type,
      });
      res.status(HttpCodes.CREATED).send({
        statusCode: res.statusCode,
        data: {
          message: ProductMessages.Created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async get(req, res, next) {
    try {
      const {
        query: { id },
      } = req;
      const products = await this.#service.get(id);
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          products,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { ProductController: new ProductController() };

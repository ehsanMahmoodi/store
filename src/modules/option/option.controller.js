const autoBind = require("auto-bind");
const { OptionService } = require("./option.service");
const HttpCodes = require("http-status-codes");
const { OptionMessages } = require("./option.messages");
const { createOptionValidation } = require("./option.validations");
class OptionController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = OptionService;
  }
  async create(req, res, next) {
    try {
      const {
        body: {
          name,
          description,
          key,
          field_type,
          is_required,
          product_id,
          enums,
        },
      } = req;
      await createOptionValidation.validateAsync({
        name,
        description,
        key,
        field_type,
        is_required,
        product_id,
      });
      await this.#service.create({
        name,
        description,
        key,
        field_type,
        is_required,
        product_id,
        enums,
      });
      res.status(HttpCodes.CREATED).send({
        statusCode: res.statusCode,
        data: {
          message: OptionMessages.Created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async get(req, res, next) {
    const {
      query: { id },
    } = req;
    const options = await this.#service.get(id);
    res.status(HttpCodes.OK).send({
      statusCode: res.statusCode,
      data: {
        options,
      },
    });
  }
}
module.exports = { OptionController: new OptionController() };

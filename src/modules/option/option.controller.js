const autoBind = require("auto-bind");
const { OptionService } = require("./option.service");
const HttpCodes = require("http-status-codes");
const { OptionMessages } = require("./option.messages");
const {
  createOptionValidation,
  updateOptionValidation,
} = require("./option.validations");
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
    try {
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
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const {
        params: { id },
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
      await updateOptionValidation.validateAsync({
        name,
        description,
        key,
        field_type,
        is_required,
        product_id,
      });
      await this.#service.update(id, {
        name,
        description,
        key,
        field_type,
        is_required,
        product_id,
        enums,
      });
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          message: OptionMessages.Updated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const {
        params: { id },
      } = req;
      await this.#service.remove(id);
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          message: OptionMessages.Removed,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { OptionController: new OptionController() };

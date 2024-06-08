const autoBind = require("auto-bind");
const { SeasonsService } = require("./seasons.service");
const { createSeasonValidation } = require("./season.validation");
const HttpCodes = require("http-status-codes");
const { SeasonsMessages } = require("./seasons.messages");
class SeasonsController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = SeasonsService;
  }
  async create(req, res, next) {
    try {
      const {
        body: { course_id, name, description, order },
      } = req;
      await createSeasonValidation.validateAsync({
        course_id,
        name,
        description,
        order,
      });
      await this.#service.create({ course_id, name, description, order });
      res.status(HttpCodes.CREATED).send({
        statusCode: res.statusCode,
        data: {
          message: SeasonsMessages.Created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { SeasonsController: new SeasonsController() };

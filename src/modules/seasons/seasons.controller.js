const autoBind = require("auto-bind");
const { SeasonsService } = require("./seasons.service");
const {
  createSeasonValidation,
  updateSeasonValidation,
  removeSeasonValidation,
} = require("./season.validation");
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
  async update(req, res, next) {
    try {
      const {
        params: { id },
        body: { name, description, order, course_id },
      } = req;
      await updateSeasonValidation.validateAsync({
        id,
        name,
        description,
        order,
        course_id,
      });
      await this.#service.update(id, { name, description, order, course_id });
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          message: SeasonsMessages.Updated,
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
        body: { course_id },
      } = req;
      await removeSeasonValidation.validateAsync({
        id,
        course_id,
      });
      await this.#service.remove(id, course_id);
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          message: SeasonsMessages.Removed,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAll(req,res,next){
    try{
      const {params:{id}}=req
      const seasons = await this.#service.getAll(id)
      res.status(HttpCodes.OK).send({
        statusCode:res.statusCode,
        data:{seasons:seasons[0].seasons}
      })
    }catch(error){
      next(error)
    }
  }
}
module.exports = { SeasonsController: new SeasonsController() };

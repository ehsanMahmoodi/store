const autoBind = require("auto-bind");
const HttpCode = require("http-status-codes");
const { UserService } = require("./user.service");
const { getProfileValidation } = require("./user.validations");
class UserController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = UserService;
  }
  async getProfile(req, res, next) {
    try {
      const {
        params: { id },
      } = req;
      await getProfileValidation.validateAsync({ id });
      const profile = await this.#service.getProfile(id);
      res.status(HttpCode.OK).send({
        statusCode: res.statusCode,
        data: {
          profile,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { UserController: new UserController() };

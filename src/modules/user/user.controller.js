const autoBind = require("auto-bind");
const HttpCode = require("http-status-codes");
const { UserService } = require("./user.service");
const {
  getProfileValidation,
  updateProfileValidation,
} = require("./user.validations");
const { UserMessages } = require("./user.messages");
const { ListOfImagesFromRequest } = require("../../common/utils/functions");
const path = require("path");
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
  async updateProfile(req, res, next) {
    try {
      let avatar;
      if (req?.fileUploadPath && req?.fileName) {
        avatar = path
          .join(req?.fileUploadPath, req?.fileName)
          .replace(/\\/g, "/");
      }
      const {
        body: { first_name, last_name, brith_date },
        params: { id },
      } = req;
      await updateProfileValidation.validateAsync({
        id,
        first_name,
        last_name,
        brith_date,
      });
      await this.#service.updateProfile(id, {
        first_name,
        last_name,
        brith_date,
        avatar,
      });
      res.status(HttpCode.OK).send({
        statusCode: res.statusCode,
        data: {
          message: UserMessages.Updated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { UserController: new UserController() };

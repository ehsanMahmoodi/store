const autoBind = require("auto-bind");
const { UserModel } = require("./user.model");
const createHttpError = require("http-errors");
const { UserMessages } = require("./user.messages");

class UserService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }
  async getProfile(id) {
    const user = await this.findUserById(id);
    return user;
  }
  async findUserById(id) {
    const user = await this.#model.findById(id, {
      otp: 0,
      __v: 0,
    });
    if (!user) throw new createHttpError.NotFound(UserMessages.NotFound);
    return user;
  }
}
module.exports = { UserService: new UserService() };

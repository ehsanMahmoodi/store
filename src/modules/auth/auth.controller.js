const autoBind = require("auto-bind");
const { AuthService } = require("./auth.service");
const { sendOtpValidation } = require("./auth.validations");
const HttpCodes = require("http-status-codes");
const { AuthMessages } = require("./auth.messages");
class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = AuthService;
  }
  async sendOtp(req, res, next) {
    try {
      const {
        body: { phone },
      } = req;
      await sendOtpValidation.validateAsync({ phone });
      const otp = await this.#service.sendOtp(phone);
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          otp,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req, res, next) {
    try {
      const {
        body: { phone, code },
      } = req;
      const { accessToken, refreshToken } = await this.#service.checkOtp({
        phone,
        code,
      });
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          message: AuthMessages.LoginSuccessfully,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req, res, next) {
    try {
      const {
        body: { refresh_token },
      } = req;
      const userId = await this.#service.verifyRefreshToken(
        refresh_token,
        next,
      );
      const accessToken = await this.#service.signAccessToken({ userId });
      const refreshToken = await this.#service.signRefreshToken({ userId });
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {}
}
module.exports = { AuthController: new AuthController() };

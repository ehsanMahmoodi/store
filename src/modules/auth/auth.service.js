const autoBind = require("auto-bind");
const { UserModel } = require("../user/user.model");
const { generateRandomNumber } = require("../../common/utils/functions");
const createHttpError = require("http-errors");
const { AuthMessages } = require("./auth.messages");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { redisClient } = require("../../configs/redis.config");
class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }
  async sendOtp(phone) {
    let user = await this.#model.findOne({ phone });
    if (!user) {
      user = await this.#model.create({ phone });
    }
    const now = Date.now();
    const otp = {
      code: generateRandomNumber(5),
      expiresIn: now + 60000 * 2,
    };
    if (user?.otp && user?.otp?.expiresIn > now) {
      throw new createHttpError.BadRequest(AuthMessages.OtpNotExpired);
    }
    user.otp = otp;
    const saveUser = await user.save();
    if (!saveUser.otp)
      throw new createHttpError.InternalServerError(AuthMessages.OtpSendError);
    return otp;
  }
  async checkOtp(authDto) {
    const user = await this.findUserByPhone(authDto?.phone);
    const now = Date.now();
    if (user?.otp) {
      if (user?.otp?.expiresIn < now) {
        throw new createHttpError.BadRequest(AuthMessages.OtpExpired);
      }
      if (user?.otp?.code !== +authDto?.code) {
        throw new createHttpError.BadRequest(AuthMessages.OtpCodeNotMatch);
      }
    } else {
      throw new createHttpError.NotFound(AuthMessages.OtpExpired);
    }
    user.verified_phone = true;
    await user.save();
    const accessToken = this.signAccessToken({
      userPhone: user?.phone,
      userId: user?._id,
    });
    const refreshToken = await this.signRefreshToken({
      userPhone: user?.phone,
      userId: user?._id,
    });
    return { accessToken, refreshToken };
  }
  async findUserByPhone(phone) {
    const user = await this.#model.findOne({ phone });
    if (!user) throw new createHttpError.NotFound(AuthMessages.NotFound);
    return user;
  }
  signAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "1h",
    });
  }
  async signRefreshToken(payload) {
    const token = jwt.sign(payload, process.env.REFRESH_TOKEN, {
      expiresIn: "1y",
    });
    await redisClient.set(payload.userId.toString(), token, {
      EX: 365 * 60 * 60 * 24, // 1 year
    });
    return token;
  }
  async verifyAccessToken(token) {
    let data;
    const verifyToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN,
      function (err, decode) {
        if (err) {
          if (/.*expire.*/i.exec(err?.name)) {
            throw new createHttpError.BadRequest("توکن منقضی شده است.");
          } else {
            throw new createHttpError.BadRequest("توکن اشتباه است.");
          }
        }
        data = decode;
      },
    );
    if (!data)
      throw new createHttpError.Unauthorized(AuthMessages.Unauthorized);
    const user = await this.#model.findById(data.userId);
    if (!user) throw new createHttpError.NotFound(AuthMessages.NotFound);
    return data.userId;
  }
  async verifyRefreshToken(token) {
    let data;
    const verifyToken = jwt.verify(
      token,
      process.env.REFRESH_TOKEN,
      function (err, decode) {
        if (err) {
          if (/.*expire.*/i.exec(err?.name)) {
            throw new createHttpError.BadRequest("توکن منقضی شده است.");
          } else {
            throw new createHttpError.BadRequest("توکن اشتباه است.");
          }
        }
        data = decode;
      },
    );
    if (!data)
      throw new createHttpError.Unauthorized(AuthMessages.Unauthorized);
    const user = await this.#model.findById(data.userId);
    if (!user) throw new createHttpError.NotFound(AuthMessages.NotFound);
    const redisToken = await redisClient.get(user?._id.toString());
    if (redisToken !== token)
      throw new createHttpError.Unauthorized(AuthMessages.Unauthorized);
    return data.userId;
  }
}

module.exports = { AuthService: new AuthService() };

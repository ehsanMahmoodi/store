const createHttpError = require("http-errors");
const { AuthorizationMessages } = require("./authorization.messages");
const { AuthService } = require("../../modules/auth/auth.service");
const { UserModel } = require("../../modules/user/user.model");
const Authorization = async (req, res, next) => {
  try {
    const accessToken = req.headers["authorization"];
    if (!accessToken)
      throw new createHttpError.Unauthorized(
        AuthorizationMessages.TokenNotFound,
      );
    const [bearer, token] = accessToken.split(" ");
    if (bearer && bearer.toLowerCase() === "bearer") {
      const userId = await AuthService.verifyAccessToken(token);
      const user = await UserModel.findById(userId, { __v: 0, otp: 0 });
      req.user = user;
      return next();
    }
    throw new createHttpError.Unauthorized(AuthorizationMessages.Unauthorized);
  } catch (error) {
    next(error);
  }
};
module.exports = { Authorization };

const Joi = require("joi");
const { objectIdPattern } = require("../../common/enums/enums");
const sendOtpValidation = Joi.object({
  phone: Joi.string()
    .pattern(/\b\d{4}[-.]?\d{3}[-.]?\d{4}\b/)
    .messages({
      "string.base": "شماره موبایل باید به صورت رشته متنی باشد.",
      "string.pattern.base": "شماره موبایل وارد شده صحیح نمی‌باشد.",
    }),
});
const logoutValidation = Joi.object({
  id: Joi.string().required().pattern(objectIdPattern).messages({
    "string.base": "آیدی وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی وارد شده صحیح نمی باشد.",
    "any.required": "آیدی الزامی می باشد.",
  }),
});
module.exports = { sendOtpValidation, logoutValidation };

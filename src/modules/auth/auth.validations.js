const Joi = require("joi");
const sendOtpValidation = Joi.object({
  phone: Joi.string()
    .pattern(/\b\d{4}[-.]?\d{3}[-.]?\d{4}\b/)
    .messages({
      "string.base": "شماره موبایل باید به صورت رشته متنی باشد.",
      "string.pattern.base": "شماره موبایل وارد شده صحیح نمی‌باشد.",
    }),
});
module.exports = { sendOtpValidation };

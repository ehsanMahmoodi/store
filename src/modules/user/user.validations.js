const Joi = require("joi");
const { objectIdPattern } = require("../../common/enums/enums");
const getProfileValidation = Joi.object({
  id: Joi.string().required().pattern(objectIdPattern).messages({
    "string.base": "آیدی وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی وارد شده صحیح نمی باشد.",
    "any.required": "آیدی الزامی می باشد.",
  }),
});
module.exports = { getProfileValidation };

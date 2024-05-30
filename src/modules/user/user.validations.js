const Joi = require("joi");
const { objectIdPattern } = require("../../common/enums/enums");
const getProfileValidation = Joi.object({
  id: Joi.string().required().pattern(objectIdPattern).messages({
    "string.base": "آیدی وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی وارد شده صحیح نمی باشد.",
    "any.required": "آیدی الزامی می باشد.",
  }),
});
const updateProfileValidation = Joi.object({
  id: Joi.string().required().pattern(objectIdPattern).messages({
    "string.base": "آیدی وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی وارد شده صحیح نمی باشد.",
    "any.required": "آیدی الزامی می باشد.",
  }),
  first_name: Joi.string().trim().min(3).messages({
    "string.base": "نام باید به صورت رشته متی باشد.",
    "string.min": "نام باید حداقل 3 کاراکتر باشد.",
    "string.empty": "نام باید حداقل 3 کاراکتر باشد.",
  }),
  last_name: Joi.string().trim().min(3).messages({
    "string.base": "نام خانوادگی باید به صورت رشته متی باشد",
    "string.min": "نام خانوادگی باید حداقل 3 کاراکتر باشد.",
    "string.empty": "نام خانوادگی باید حداقل 3 کاراکتر باشد.",
  }),
  brith_date: Joi.string().trim().messages({
    "string.base": "تاریخ تولد باید به صورت رشته متی باشد.",
    "string.empty": "تاریخ تولد باید به صورت رشته متی باشد.",
  }),
});
module.exports = { getProfileValidation, updateProfileValidation };

const Joi = require("joi");
const { objectIdPattern } = require("../../common/enums/enums");
const createBlogValidation = Joi.object({
  category_id: Joi.string()
    .trim()
    .required()
    .pattern(objectIdPattern)
    .messages({
      "string.base": "آیدی مقاله وارد شده صحیح نمی باشد.",
      "string.pattern.base": "آیدی مقاله وارد شده صحیح نمی باشد.",
      "any.required": "آیدی مقاله الزامی می باشد.",
    }),
  title: Joi.string().trim().required().min(3).messages({
    "string.min": "عنوان مقاله باید حداقل 3 کارامتر باشد.",
    "any.required": "عنوان مقاله الزامیست",
  }),
  description: Joi.string().trim().required().min(5).messages({
    "string.min": "توضیحات مقاله باید حداقل 5 کارامتر باشد.",
    "any.required": "توضیحات مقاله الزامیست",
  }),
  body: Joi.string().trim().required().min(11).messages({
    "string.min": "متن مقاله باید حداقل 11 کارامتر باشد.",
    "any.required": "متن مقاله الزامیست",
  }),
});
module.exports = { createBlogValidation };

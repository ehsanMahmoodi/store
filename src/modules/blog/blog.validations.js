const Joi = require("joi");
const { objectIdPattern } = require("../../common/enums/enums");
const createBlogValidation = Joi.object({
  category_id: Joi.string()
    .trim()
    .required()
    .pattern(objectIdPattern)
    .messages({
      "string.base": "آیدی دسته‌بندی وارد شده صحیح نمی باشد.",
      "string.pattern.base": "آیدی دسته‌بندی وارد شده صحیح نمی باشد.",
      "any.required": "آیدی دسته‌بندی الزامی می باشد.",
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
const updateBlogValidation = Joi.object({
  category_id: Joi.string().trim().pattern(objectIdPattern).messages({
    "string.base": "آیدی دسته‌بندی وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی دسته‌بندی وارد شده صحیح نمی باشد.",
  }),
  title: Joi.string().trim().min(3).messages({
    "string.min": "عنوان مقاله باید حداقل 3 کارامتر باشد.",
  }),
  description: Joi.string().trim().min(5).messages({
    "string.min": "توضیحات مقاله باید حداقل 5 کارامتر باشد.",
  }),
  body: Joi.string().trim().min(11).messages({
    "string.min": "متن مقاله باید حداقل 11 کارامتر باشد.",
  }),
});
module.exports = { createBlogValidation, updateBlogValidation };

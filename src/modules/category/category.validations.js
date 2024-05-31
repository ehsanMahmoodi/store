const Joi = require("joi");
const {
  objectIdPattern,
  persianTextPattern,
  englishTextPattern,
} = require("../../common/enums/enums");
const createCategoryValidation = Joi.object({
  fa_name: Joi.string()
    .trim()
    .required()
    .min(3)
    .pattern(persianTextPattern)
    .messages({
      "string.min": "عنوان فارسی دسته‌بندی باید حداقل 3 کاراکتر باشد.",
      "any.required": "عنوان دسته‌بندی الزامیست.",
      "string.pattern.base":
        "فرمت عنوان فارسی دسته‌بندی وارد شده صحیح نمی باشد.",
    }),
  en_name: Joi.string()
    .trim()
    .required()
    .min(3)
    .pattern(englishTextPattern)
    .messages({
      "string.min": "عنوان انگلیسی دسته‌بندی باید حداقل 3 کاراکتر باشد.",
      "any.required": "عنوان دسته‌بندی الزامیست.",
      "string.pattern.base":
        "فرمت عنوان انگلیسی دسته‌بندی وارد شده صحیح نمی باشد.",
    }),
  slug: Joi.string().trim().required().min(3).messages({
    "string.min": "اسلاگ دسته‌بندی باید حداقل 3 کاراکتر باشد.",
    "any.required": "اسلاگ دسته‌بندی الزامیست.",
  }),
  parent: Joi.string().pattern(objectIdPattern).messages({
    "string.pattern.base": "آیدی دسته‌بندی وارد شده صحیح نمی باشد",
  }),
});
module.exports = { createCategoryValidation };

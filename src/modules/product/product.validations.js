const Joi = require("joi");
const { objectIdPattern } = require("../../common/enums/enums");
const {
  updateCategoryValidation,
} = require("../category/category.validations");
const createProductValidation = Joi.object({
  category_id: Joi.string().required().pattern(objectIdPattern).messages({
    "string.base": "آیدی دسته‌بندی وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی دسته‌بندی وارد شده صحیح نمی باشد.",
  }),
  seller_id: Joi.string().required().pattern(objectIdPattern).messages({
    "string.base": "آیدی فروشنده وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی فروشنده وارد شده صحیح نمی باشد.",
  }),
  name: Joi.string().min(3).trim().required().messages({
    "string.min": "عنوان محصول باید حداقل 3 کاراکتر باشد.",
    "any.required": "عنوان محصول الزامیست",
  }),
  description: Joi.string().min(3).trim().required().messages({
    "string.min": "توضیحات محصول باید حداقل 5 کاراکتر باشد.",
    "any.required": "توضیحات محصول الزامیست",
  }),
  price: Joi.number().required().min(0).messages({
    "number.base": "قیمت محصول باید به صورت عدد باشد.",
    "any.required": "قیمت محصول الزامیست",
    "number.min": "قیمت محصول نمی تواند کمتر از 0 باشد.",
  }),
  discount_percentage: Joi.number().min(0).messages({
    "number.base": "درصد تخفیف محصول باید به صورت عدد باشد.",
    "number.min": "درصد تخفیف محصول نمی تواند کمتر از 0 باشد.",
  }),
  stock: Joi.number().required().messages({
    "number.base": "تعداد موجودی محصول باید به صورت عدد باشد.",
    "any.required": "تعداد موجودی محصول الزامیست",
  }),
  status: Joi.string()
    .valid("available", "out of stock", "pre-order")
    .messages({
      "string.valid":
        "وضعیت محصول باید یکی از موارد (available,out of stock,pre-order) باشد.",
    }),
  type: Joi.string().required().valid("physical", "virtual").messages({
    "string.valid": "نوع محصول باید یکی از موارد (physical,virtual) باشد.",
  }),
});
const updateProductValidation = Joi.object({
  category_id: Joi.string().pattern(objectIdPattern).messages({
    "string.base": "آیدی دسته‌بندی وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی دسته‌بندی وارد شده صحیح نمی باشد.",
  }),
  seller_id: Joi.string().pattern(objectIdPattern).messages({
    "string.base": "آیدی فروشنده وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی فروشنده وارد شده صحیح نمی باشد.",
  }),
  name: Joi.string().min(3).trim().messages({
    "string.min": "عنوان محصول باید حداقل 3 کاراکتر باشد.",
  }),
  description: Joi.string().min(3).trim().messages({
    "string.min": "توضیحات محصول باید حداقل 5 کاراکتر باشد.",
  }),
  price: Joi.number().min(0).messages({
    "number.base": "قیمت محصول باید به صورت عدد باشد.",
    "number.min": "قیمت محصول نمی تواند کمتر از 0 باشد.",
  }),
  discount_percentage: Joi.number().min(0).messages({
    "number.base": "درصد تخفیف محصول باید به صورت عدد باشد.",
    "number.min": "درصد تخفیف محصول نمی تواند کمتر از 0 باشد.",
  }),
  stock: Joi.number().messages({
    "number.base": "تعداد موجودی محصول باید به صورت عدد باشد.",
  }),
  status: Joi.string()
    .valid("available", "out of stock", "pre-order")
    .messages({
      "string.valid":
        "وضعیت محصول باید یکی از موارد (available,out of stock,pre-order) باشد.",
    }),
  type: Joi.string().required().valid("physical", "virtual").messages({
    "string.valid": "نوع محصول باید یکی از موارد (physical,virtual) باشد.",
  }),
});
module.exports = { createProductValidation, updateProductValidation };

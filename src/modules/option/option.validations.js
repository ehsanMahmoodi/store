const Joi = require("joi");
const { objectIdPattern } = require("../../common/enums/enums");
const createOptionValidation = Joi.object({
  product_id: Joi.string().required().pattern(objectIdPattern).messages({
    "string.base": "آیدی محصول وارد شده صحیح نمی باشد.",
    "any.required": "آیدی محصول الزامیست.",
    "string.pattern.base": "آیدی محصول وارد شده صحیح نمی باشد.",
  }),
  name: Joi.string().trim().min(3).required().messages({
    "string.min": "عنوان آپشن باید حداقل 3 کاراکتر باشد.",
    "any.required": "عنوان آپشن الزامیست",
  }),
  key: Joi.string().trim().min(3).required().messages({
    "string.min": "key آپشن باید حداقل 3 کاراکتر باشد.",
    "any.required": "key آپشن الزامیست",
  }),
  description: Joi.string().trim().min(5).messages({
    "string.min": "توضیحات آپشن باید حداقل 5 کاراکتر باشد.",
  }),
  field_type: Joi.string()
    .required()
    .valid("number", "string", "boolean", "array")
    .messages({
      "string.valid":
        "field_type آپشن باید یکی از موارد (array,boolean,string,number) باشد.",
      "any.required": "نوع آپشن الزامیست.",
    }),
  is_required: Joi.boolean().messages({
    "boolean.base": "فیلد is_required باید به صورت boolean باشد.",
  }),
});
const updateOptionValidation = Joi.object({
  product_id: Joi.string().pattern(objectIdPattern).messages({
    "string.base": "آیدی محصول وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی محصول وارد شده صحیح نمی باشد.",
  }),
  name: Joi.string().trim().min(3).messages({
    "string.min": "عنوان آپشن باید حداقل 3 کاراکتر باشد.",
  }),
  key: Joi.string().trim().min(3).messages({
    "string.min": "key آپشن باید حداقل 3 کاراکتر باشد.",
  }),
  description: Joi.string().trim().min(5).messages({
    "string.min": "توضیحات آپشن باید حداقل 5 کاراکتر باشد.",
  }),
  field_type: Joi.string()
    .valid("number", "string", "boolean", "array")
    .messages({
      "string.valid":
        "field_type آپشن باید یکی از موارد (array,boolean,string,number) باشد.",
    }),
  is_required: Joi.boolean().messages({
    "boolean.base": "فیلد is_required باید به صورت boolean باشد.",
  }),
});
module.exports = { createOptionValidation, updateOptionValidation };

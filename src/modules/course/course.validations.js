const Joi = require("joi");
const { objectIdPattern } = require("../../common/enums/enums");
const createCourseValidation = Joi.object({
  category_id: Joi.string()
    .trim()
    .required()
    .pattern(objectIdPattern)
    .messages({
      "string.base": "آیدی دسته‌بندی وارد شده صحیح نمی باشد.",
      "string.pattern.base": "آیدی دسته‌بندی وارد شده صحیح نمی باشد.",
      "any.required": "آیدی دسته‌بندی الزامی می باشد.",
    }),
  name: Joi.string().trim().required().min(3).messages({
    "string.min": "عنوان دوره باید حداقل 3 کاراکتر باشد.",
    "any.required": "عنوان دوره الزامیست",
  }),
  description: Joi.string().trim().required().min(5).messages({
    "string.min": "توضیحات دوره باید حداقل 5 کاراکتر باشد.",
    "any.required": "توضیحات دوره الزامیست",
  }),
  allTeacher: Joi.array()
    .items(
      Joi.string().required().pattern(objectIdPattern).messages({
        "string.base": "آیدی مدرس وارد شده صحیح نمی باشد.",
        "string.pattern.base": "آیدی مدرس وارد شده صحیح نمی باشد.",
        "any.required": "آیدی مدرس الزامی می باشد.",
      }),
    )
    .required()
    .messages({
      "any.required": "مدرس دوره الزامیست",
    }),
  allStudent: Joi.array().items(
    Joi.string().pattern(objectIdPattern).messages({
      "string.base": "آیدی دانش آموز وارد شده صحیح نمی باشد.",
      "string.pattern.base": "آیدی دانش آموز وارد شده صحیح نمی باشد.",
    }),
  ),
  price: Joi.number().required().min(0).messages({
    "number.base": "قیمت دوره باید عدد صحیح باشد.",
    "number.min": "قیمت دوره نمی تواند کمتر از 0 باشد.",
    "any.required": "قیمت دوره الزامیست",
  }),
  startDate: Joi.date().messages({
    "date.base": "فرمت تاریخ شروع دوره درست نیست.",
  }),
  endDate: Joi.date().min(5).messages({
    "date.base": "فرمت تاریخ پایان دوره درست نیست.",
  }),
  duration: Joi.number().min(1).messages({
    "number.base": "مدت زمان باید عدد صحیح باشد.",
    "number.min": "مدت زمان دوره نمی تواند کمتر از 1 باشد.",
  }),
  level: Joi.string().required().valid("پیشرفته", "متوسط", "مبتدی").messages({
    "any.only": "سطح دوره باید یکی از موارد (مبتدی،متوسط،پیشرفته) باشد.",
    "any.required": "سطح دوره الزامیست",
  }),
  format: Joi.string().required().valid("حضوری", "آنلاین").messages({
    "any.only": "فرمت دوره باید یکی از موارد (آنلاین،حضوری) باشد.",
    "any.required": "فرمت دوره الزامیست",
  }),
  type: Joi.string().required().valid("عادی", "ویژه").messages({
    "any.only": "نوع دوره باید یکی از موارد (ویژه،عادی) باشد.",
    "any.required": "نوع دوره الزامیست",
  }),
  capacity: Joi.number().min(0).messages({
    "number.base": "ظرفیت باید عدد صحیح باشد.",
    "number.min": "ظرفیت دوره نمی تواند کمتر از 0 باشد.",
  }),
});
const updateCourseValidation = Joi.object({
  category_id: Joi.string().trim().pattern(objectIdPattern).messages({
    "string.base": "آیدی دسته‌بندی وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی دسته‌بندی وارد شده صحیح نمی باشد.",
  }),
  name: Joi.string().trim().min(3).messages({
    "string.min": "عنوان دوره باید حداقل 3 کاراکتر باشد.",
  }),
  description: Joi.string().trim().min(5).messages({
    "string.min": "توضیحات دوره باید حداقل 5 کاراکتر باشد.",
  }),
  allTeacher: Joi.array().items(
    Joi.string().pattern(objectIdPattern).messages({
      "string.base": "آیدی مدرس وارد شده صحیح نمی باشد.",
      "string.pattern.base": "آیدی مدرس وارد شده صحیح نمی باشد.",
    }),
  ),
  allStudent: Joi.array().items(
    Joi.string().pattern(objectIdPattern).messages({
      "string.base": "آیدی دانش آموز وارد شده صحیح نمی باشد.",
      "string.pattern.base": "آیدی دانش آموز وارد شده صحیح نمی باشد.",
    }),
  ),
  price: Joi.number().min(0).messages({
    "number.base": "قیمت دوره باید عدد صحیح باشد.",
    "number.min": "قیمت دوره نمی تواند کمتر از 0 باشد.",
  }),
  startDate: Joi.date().messages({
    "date.base": "فرمت تاریخ شروع دوره درست نیست.",
  }),
  endDate: Joi.date().min(5).messages({
    "date.base": "فرمت تاریخ پایان دوره درست نیست.",
  }),
  duration: Joi.number().min(1).messages({
    "number.base": "مدت زمان باید عدد صحیح باشد.",
    "number.min": "مدت زمان دوره نمی تواند کمتر از 1 باشد.",
  }),
  level: Joi.string().valid("پیشرفته", "متوسط", "مبتدی").messages({
    "any.only": "سطح دوره باید یکی از موارد (مبتدی،متوسط،پیشرفته) باشد.",
  }),
  format: Joi.string().valid("حضوری", "آنلاین").messages({
    "any.only": "فرمت دوره باید یکی از موارد (آنلاین،حضوری) باشد.",
  }),
  type: Joi.string().valid("عادی", "ویژه").messages({
    "any.only": "نوع دوره باید یکی از موارد (ویژه،عادی) باشد.",
  }),
  capacity: Joi.number().min(0).messages({
    "number.base": "ظرفیت باید عدد صحیح باشد.",
    "number.min": "ظرفیت دوره نمی تواند کمتر از 0 باشد.",
  }),
});
module.exports = { createCourseValidation, updateCourseValidation };

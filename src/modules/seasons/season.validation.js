const Joi = require("joi");
const { objectIdPattern } = require("../../common/enums/enums");
const createSeasonValidation = Joi.object({
  course_id: Joi.string().trim().required().pattern(objectIdPattern).messages({
    "string.base": "آیدی دوره وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی دوره وارد شده صحیح نمی باشد.",
    "any.required": "آیدی دوره الزامی می باشد.",
  }),
  name: Joi.string().trim().required().min(3).messages({
    "string.min": "عنوان فصل باید حداقل 3 کاراکتر باشد.",
    "any.required": "عنوان فصل الزامیست",
  }),
  description: Joi.string().trim().min(5).messages({
    "string.min": "توضیحات فصل باید حداقل 5 کاراکتر باشد.",
  }),
  order: Joi.number().min(1).messages({
    "number.min": "ترتیب فصل نمی تواند کمتر از 0 باشد.",
  }),
});
const updateSeasonValidation = Joi.object({
  course_id: Joi.string().trim().required().pattern(objectIdPattern).messages({
    "string.base": "آیدی دوره وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی دوره وارد شده صحیح نمی باشد.",
    "any.required": "آیدی دوره الزامی می باشد.",
  }),
  id: Joi.string().trim().required().pattern(objectIdPattern).messages({
    "string.base": "آیدی فصل وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی فصل وارد شده صحیح نمی باشد.",
    "any.required": "آیدی فصل الزامی می باشد.",
  }),
  name: Joi.string().trim().min(3).messages({
    "string.min": "عنوان فصل باید حداقل 3 کاراکتر باشد.",
  }),
  description: Joi.string().trim().min(5).messages({
    "string.min": "توضیحات فصل باید حداقل 5 کاراکتر باشد.",
  }),
  order: Joi.number().min(1).messages({
    "number.min": "ترتیب فصل نمی تواند کمتر از 0 باشد.",
  }),
});
const removeSeasonValidation = Joi.object({
  course_id: Joi.string().trim().required().pattern(objectIdPattern).messages({
    "string.base": "آیدی دوره وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی دوره وارد شده صحیح نمی باشد.",
    "any.required": "آیدی دوره الزامی می باشد.",
  }),
  id: Joi.string().trim().required().pattern(objectIdPattern).messages({
    "string.base": "آیدی فصل وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی فصل وارد شده صحیح نمی باشد.",
    "any.required": "آیدی فصل الزامی می باشد.",
  }),
});
module.exports = {
  createSeasonValidation,
  updateSeasonValidation,
  removeSeasonValidation,
};

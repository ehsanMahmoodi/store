const Joi = require("joi");
const { objectIdPattern } = require("../../common/enums/enums");

const createEpisodeValidation = Joi.object({
  season_id: Joi.string().trim().required().pattern(objectIdPattern).messages({
    "string.base": "آیدی فصل دوره وارد شده صحیح نمی باشد.",
    "string.pattern.base": "آیدی فصل دوره وارد شده صحیح نمی باشد.",
    "any.required": "آیدی فصل دوره الزامی می باشد.",
  }),
  title: Joi.string().required().min(5).messages({
    "any.required": "عنوان اپیزود الزامیست",
    "string.min": "عنوان اپیزود نمی تواند کمتر از 5 کاراکتر باشد.",
  }),
  description: Joi.string().min(5).messages({
    "string.min": "توضیحات اپیزود نمی تواند کمتر از 5 کاراکتر باشد.",
  }),
  isFreeAccess: Joi.boolean().messages({
    'boolean.base':"isFreeAccess مقدار بولینی می باشد."
  }),
  time: Joi.number().min(0).messages({
    "string.min": "زمان ویدیو نمی تواند کمتر از 0 باشد",
  }),
});
module.exports = { createEpisodeValidation };

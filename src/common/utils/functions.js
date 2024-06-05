const { randomInt } = require("crypto");
const path = require("path");
const slugify = require("slugify");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const { isAfter, format } = require("date-fns");
const { Messages } = require("./messages");
const generateRandomNumber = (length = 3) => {
  let min, max;
  min = Math.pow(10, length - 1);
  max = Math.pow(10, length) - 1;
  if (length <= 3) {
    min = 1000;
    max = 9999;
  }
  return randomInt(min, max);
};
function ListOfImagesFromRequest(files, fileUploadPath) {
  if (files?.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath, file.filename))
      .map((item) => item.replace(/\\/g, "/"));
  } else {
    return [];
  }
}
const generateSlug = (text) => {
  return slugify(text, {
    replacement: "-",
    trim: true,
    lower: true,
  });
};
const checkValidObjectId = (id) => {
  if (!isValidObjectId(id))
    throw new createHttpError.BadRequest("آیدی وارد شده صحیح نمی باشد.");
  return true;
};
const getImageFromRequest = (fileName, fileUploadPath) => {
  return path.join(fileUploadPath, fileName).replace(/\\/g, "/");
};
const convertStringToArray = (string = "") => {
  if (string.trim().length > 0) {
    return string.split(",");
  }
  return [];
};
const AppendSharpToArrayIndexes = (array = []) => {
  if (array.length > 0) {
    return array.map((item) => {
      if (!item.startsWith("#")) {
        return "#" + item;
      } else {
        return item;
      }
    });
  }
  return [];
};
const checkExistArrayOfIdInModel = async (array = [], modelName) => {
  for (let id of array) {
    let findId = await modelName.findById(id);
    if (!findId)
      throw new createHttpError.NotFound(id + " آیدی کاربر یافت نشد.");
  }
};
const removeDuplicatesArrayValues = (array = []) => {
  if (array && array.length > 0) return [...new Set(array)];
  return [];
};
const removeUndefinedObjectValues = (data = {}) => {
  for (const key in data) {
    if (data[key] === undefined) {
      delete data[key];
    }
  }
  return data;
};
const checkEndTimeGreaterThanStartTime = (start, end) => {
  let result = isAfter(new Date(end), new Date(start));
  if (!result)
    throw new createHttpError.BadRequest(Messages.EndTimeGreaterThanStart);
  return true;
};
const checkTimeGreaterThanNowTime = (start, end) => {
  let result = isAfter(new Date(end), new Date(start));
  if (!result)
    throw new createHttpError.BadRequest(Messages.TimeGreaterThanNowTime);
  return true;
};
module.exports = {
  generateRandomNumber,
  ListOfImagesFromRequest,
  generateSlug,
  checkValidObjectId,
  getImageFromRequest,
  convertStringToArray,
  AppendSharpToArrayIndexes,
  checkExistArrayOfIdInModel,
  removeDuplicatesArrayValues,
  removeUndefinedObjectValues,
  checkEndTimeGreaterThanStartTime,
  checkTimeGreaterThanNowTime,
};

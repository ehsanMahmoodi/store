const { randomInt } = require("crypto");
const path = require("path");
const slugify = require("slugify");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
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
module.exports = {
  generateRandomNumber,
  ListOfImagesFromRequest,
  generateSlug,
  checkValidObjectId,
  getImageFromRequest,
  convertStringToArray,
  AppendSharpToArrayIndexes,
};

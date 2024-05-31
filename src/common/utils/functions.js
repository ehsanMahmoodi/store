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
      .map((file) => path.join(fileUploadPath, file.fileName))
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
module.exports = {
  generateRandomNumber,
  ListOfImagesFromRequest,
  generateSlug,
  checkValidObjectId,
};

const { randomInt } = require("crypto");
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
module.exports = { generateRandomNumber };

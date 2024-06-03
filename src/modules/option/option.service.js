const autoBind = require("auto-bind");
const { OptionModel } = require("./option.model");
const createHttpError = require("http-errors");
const { OptionMessages } = require("./option.messages");
const { convertStringToArray } = require("../../common/utils/functions");
const { ProductModel } = require("../product/product.model");

class OptionService {
  #model;
  #productModel;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#productModel = ProductModel;
  }
  async create(optionDto) {
    // check exist product
    const product = await this.#productModel.findById(optionDto.product_id);
    // check already exist option name and key
    await this.alreadyExistOption(optionDto.name, optionDto.key);
    if (optionDto?.enums) {
      if (typeof optionDto.enums === "string")
        optionDto.enums = convertStringToArray(optionDto.enums);
    }
    const newOption = await this.#model.create(optionDto);
    await this.#productModel.updateOne(
      { _id: optionDto.product_id },
      {
        $push: {
          options: newOption,
        },
      },
    );
    if (!newOption)
      throw new createHttpError.InternalServerError(
        OptionMessages.CreatedError,
      );
    return true;
  }
  async alreadyExistOption(name, key) {
    const option = await this.#model.findOne({ $or: [{ name }, { key }] });
    if (option) throw new createHttpError.Conflict(OptionMessages.Conflict);
    return true;
  }
}
module.exports = { OptionService: new OptionService() };

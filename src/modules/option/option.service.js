const autoBind = require("auto-bind");
const { OptionModel } = require("./option.model");
const createHttpError = require("http-errors");
const { OptionMessages } = require("./option.messages");
const {
  convertStringToArray,
  checkValidObjectId,
} = require("../../common/utils/functions");
const { ProductModel } = require("../product/product.model");
const { Types } = require("mongoose");
const { ProductMessages } = require("../product/product.messages");

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
  async get(id) {
    if (id && id.trim().length > 0) {
      return await this.findById(id);
    }
    return await this.#model.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: this.getOptionProjection(),
      },
    ]);
  }
  async findById(id) {
    checkValidObjectId(id);
    const option = await this.#model.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: this.getOptionProjection(),
      },
    ]);
    if (!option || option.length <= 0)
      throw new createHttpError.NotFound(ProductMessages.NotFound);
    return option;
  }
  getOptionProjection() {
    return {
      "product.author": 0,
      "product.price": 0,
      "product.discount_code": 0,
      "product.discount_percentage": 0,
      "product.stock": 0,
      "product.category_id": 0,
      "product.images": 0,
      "product.status": 0,
      "product.seller_id": 0,
      "product.tags": 0,
      "product.type": 0,
      "product.__v": 0,
      "product.options": 0,
    };
  }
}
module.exports = { OptionService: new OptionService() };

const autoBind = require("auto-bind");
const { ProductModel } = require("./product.model");
const createHttpError = require("http-errors");
const { ProductMessages } = require("./product.messages");
const { UserService } = require("../user/user.service");
const { CategoryService } = require("../category/category.service");
const {
  convertStringToArray,
  AppendSharpToArrayIndexes,
  checkValidObjectId,
} = require("../../common/utils/functions");
const { Types } = require("mongoose");

class ProductService {
  #model;
  #categoryService;
  #userService;
  constructor() {
    autoBind(this);
    this.#model = ProductModel;
    this.#categoryService = CategoryService;
    this.#userService = UserService;
  }
  async create(productDto) {
    // stock handler in virtual products
    if (productDto.type.toLowerCase() === "virtual")
      productDto.stock = undefined;
    // stock and status handler
    if (productDto.stock <= 0) {
      productDto.stock = 0;
      productDto.status = "out of stock";
    }
    // check exist category_id
    await this.#categoryService.findCategoryById(productDto.category_id);
    // check exist seller_id
    await this.#userService.findUserById(productDto.seller_id);
    if (productDto?.tags) {
      if (typeof productDto?.tags === "string") {
        productDto.tags = convertStringToArray(productDto.tags);
      }
      productDto.tags = AppendSharpToArrayIndexes(productDto.tags);
    }
    const newProduct = await this.#model.create(productDto);
    if (!newProduct)
      throw new createHttpError.InternalServerError(
        ProductMessages.CreatedError,
      );
    return true;
  }
  async get(id) {
    if (id && id.trim().length > 0) {
      return await this.findById(id);
    }
    return await this.#model.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $lookup: {
          from: "users",
          localField: "seller_id",
          foreignField: "_id",
          as: "seller",
        },
      },
      {
        $unwind: "$seller",
      },
      {
        $project: this.getProductProjection(),
      },
      {
        $addFields: {
          "author.full_name": {
            $concat: ["$author.first_name", " ", "$author.last_name"],
          },
          "seller.full_name": {
            $concat: ["$seller.first_name", " ", "$seller.last_name"],
          },
        },
      },
    ]);
  }
  async findById(id) {
    checkValidObjectId(id);
    const product = await this.#model.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $lookup: {
          from: "users",
          localField: "seller_id",
          foreignField: "_id",
          as: "seller",
        },
      },
      {
        $unwind: "$seller",
      },
      {
        $project: this.getProductProjection(),
      },
      {
        $addFields: {
          "author.full_name": {
            $concat: ["$author.first_name", " ", "$author.last_name"],
          },
          "seller.full_name": {
            $concat: ["$seller.first_name", " ", "$seller.last_name"],
          },
        },
      },
    ]);
    if (!product || product.length <= 0)
      throw new createHttpError.NotFound(ProductMessages.NotFound);
    return product;
  }
  getProductProjection() {
    return {
      "author.otp": 0,
      "author.phone": 0,
      "author.verified_phone": 0,
      "author.brith_date": 0,
      "author.discount": 0,
      "author.wallet_balance": 0,
      "author.__v": 0,
      "author.role": 0,
      "author.email": 0,
      "seller.otp": 0,
      "seller.phone": 0,
      "seller.verified_phone": 0,
      "seller.brith_date": 0,
      "seller.discount": 0,
      "seller.wallet_balance": 0,
      "seller.__v": 0,
      "seller.role": 0,
      "seller.email": 0,
      "category.icon": 0,
      "category.parent": 0,
      "category.parents": 0,
      "category.depth": 0,
      category_id: 0,
      seller_id: 0,
      __v: 0,
    };
  }
  async update(id, productDto) {
    // check exist product
    const product = await this.findById(id);
    // stock handler in virtual products
    if (productDto?.type.toLowerCase() === "virtual")
      productDto.stock = undefined;
    // stock and status handler
    if (productDto?.stock <= 0) {
      productDto.stock = 0;
      productDto.status = "out of stock";
    }
    // check exist category_id
    if (productDto?.category_id)
      await this.#categoryService.findCategoryById(productDto.category_id);
    // check exist seller_id
    if (productDto?.seller_id)
      await this.#userService.findUserById(productDto.seller_id);
    if (productDto?.tags) {
      if (typeof productDto?.tags === "string") {
        productDto.tags = convertStringToArray(productDto.tags);
      }
      productDto.tags = AppendSharpToArrayIndexes(productDto.tags);
    }
    const updateProduct = await this.#model.updateOne(
      { _id: id },
      { $set: productDto },
    );
    if (updateProduct.modifiedCount <= 0)
      throw new createHttpError.InternalServerError(
        ProductMessages.UpdatedError,
      );
    return true;
  }
  async remove(id) {
    await this.findById(id);
    const removeProduct = await this.#model.deleteOne({ _id: id });
    if (removeProduct.deletedCount <= 0)
      throw new createHttpError.InternalServerError(
        ProductMessages.RemovedError,
      );
    return true;
  }
}
module.exports = { ProductService: new ProductService() };

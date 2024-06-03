const autoBind = require("auto-bind");
const { ProductModel } = require("./product.model");
const createHttpError = require("http-errors");
const { ProductMessages } = require("./product.messages");
const { UserService } = require("../user/user.service");
const { CategoryService } = require("../category/category.service");
const {
  convertStringToArray,
  AppendSharpToArrayIndexes,
} = require("../../common/utils/functions");

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
}
module.exports = { ProductService: new ProductService() };

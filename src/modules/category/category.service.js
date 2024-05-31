const autoBind = require("auto-bind");
const { CategoryModel } = require("./category.model");
const createHttpError = require("http-errors");
const { CategoryMessages } = require("./category.messages");
const {
  generateSlug,
  getNestedCategories,
} = require("../../common/utils/functions");
const { Types } = require("mongoose");
class CategoryService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
  }
  async create(categoryDto) {
    // check exist category-name
    const name = [categoryDto.fa_name, categoryDto.en_name];
    await this.alreadyExistCategoryByName(name);
    // check exist category-slug
    if (categoryDto?.slug) {
      await this.alreadyExistCategoryBySlug(categoryDto?.slug);
      categoryDto.slug = generateSlug(categoryDto?.slug);
    }
    if (categoryDto?.parent) {
      const categoryPatent = await this.findCategoryById(categoryDto.parent);
      categoryDto.parent = categoryPatent._id;
      categoryDto.depth = categoryPatent.depth + 1;
      categoryDto.parents = [
        ...new Set(
          [categoryPatent._id.toString()]
            .concat(categoryPatent.parents.map((id) => id.toString()))
            .map((id) => new Types.ObjectId(id)),
        ),
      ];
    }
    const newCategory = await this.#model.create(categoryDto);
    if (!newCategory)
      throw new createHttpError.InternalServerError(
        CategoryMessages.CreatedError,
      );
    return true;
  }
  async alreadyExistCategoryByName(name) {
    const [fa_name, en_name] = name;
    const category = await this.#model.findOne({
      $or: [{ fa_name }, { en_name }],
    });
    if (category)
      throw new createHttpError.Conflict(CategoryMessages.ConflictName);
    return true;
  }
  async alreadyExistCategoryBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (category)
      throw new createHttpError.Conflict(CategoryMessages.ConflictSlug);
    return true;
  }
  async findCategoryById(id) {
    const category = await this.#model.findById(id);
    if (!category)
      throw new createHttpError.NotFound(CategoryMessages.NotFound);
    return category;
  }
}
module.exports = { CategoryService: new CategoryService() };

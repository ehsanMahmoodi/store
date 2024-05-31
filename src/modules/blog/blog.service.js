const autoBind = require("auto-bind");
const { BlogModel } = require("./blog.model");
const createHttpError = require("http-errors");
const { BlogMessages } = require("./blog.messages");
const { CategoryService } = require("../category/category.service");

class BlogService {
  #model;
  #categoryService;
  constructor() {
    autoBind(this);
    this.#model = BlogModel;
    this.#categoryService = CategoryService;
  }
  async create(blogDto) {
    // check exist category_id
    await this.#categoryService.findCategoryById(blogDto?.category_id);
    // check exist title
    await this.alreadyExistBlogByTitle(blogDto?.title);
    const newBlog = await this.#model.create(blogDto);
    if (!newBlog)
      throw new createHttpError.InternalServerError(BlogMessages.CreatedError);
    return true;
  }
  async alreadyExistBlogByTitle(title) {
    const blog = await this.#model.findOne({ title });
    if (blog) throw new createHttpError.Conflict(BlogMessages.Conflict);
    return true;
  }
}
module.exports = { BlogService: new BlogService() };

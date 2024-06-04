const autoBind = require("auto-bind");
const { CourseModel } = require("./course.model");
const { UserService } = require("../user/user.service");
const { CategoryService } = require("../category/category.service");
const createHttpError = require("http-errors");
const { CourseMessages } = require("./course.messages");
const {
  checkExistArrayOfIdInModel,
  convertStringToArray,
  removeDuplicatesArrayValues,
} = require("../../common/utils/functions");
const { UserModel } = require("../user/user.model");

class CourseService {
  #model;
  #userService;
  #userModel;
  #categoryService;
  constructor() {
    autoBind(this);
    this.#model = CourseModel;
    this.#userService = UserService;
    this.#categoryService = CategoryService;
    this.#userModel = UserModel;
  }
  async create(courseDto) {
    // check exist category_id
    await this.#categoryService.findCategoryById(courseDto?.category_id);
    // calculation course  teacher
    courseDto.teacher = await this.#calculationCourseTeacherOrStudent(
      "teacher",
      courseDto.teacher,
      this.#userModel,
    );
    // calculation course  teacher
    courseDto.students = await this.#calculationCourseTeacherOrStudent(
      "students",
      courseDto.students,
      this.#userModel,
    );
    // check start date and end date
    if (courseDto.startDate === courseDto.endDate)
      throw new createHttpError.Conflict(CourseMessages.DateConflict);
    // string to array fields
    if (typeof courseDto.materials === "string")
      courseDto.materials = convertStringToArray(courseDto.materials);
    if (typeof courseDto.prerequisites === "string")
      courseDto.prerequisites = convertStringToArray(courseDto.prerequisites);
    if (typeof courseDto.topics === "string")
      courseDto.topics = convertStringToArray(courseDto.topics);
    // create course
    const newCourse = await this.#model.create(courseDto);
    if (!newCourse)
      throw new createHttpError.InternalServerError(
        CourseMessages.CreatedError,
      );
    return true;
  }
  async #calculationCourseTeacherOrStudent(fieldName, listOfPeople, model) {
    // remove duplicate values in listOfPeople
    let newListOfPeople = removeDuplicatesArrayValues(listOfPeople);
    // check exist person_id in user model
    await checkExistArrayOfIdInModel(newListOfPeople, model);
    return newListOfPeople;
  }
}
module.exports = { CourseService: new CourseService() };

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
  removeUndefinedObjectValues,
  checkEndTimeGreaterThanStartTime,
  checkTimeGreaterThanNowTime,
} = require("../../common/utils/functions");
const { UserModel } = require("../user/user.model");
const { formatISO9075 } = require("date-fns");

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
    if (courseDto.startDate && courseDto.endDate) {
      checkEndTimeGreaterThanStartTime(courseDto.startDate, courseDto.endDate);
    }
    if (courseDto.startDate)
      checkTimeGreaterThanNowTime(new Date(), courseDto.startDate);
    if (courseDto.endDate)
      checkTimeGreaterThanNowTime(new Date(), courseDto.startDate);
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
  async update(id, courseDto) {
    // find course
    const course = await this.findOneById(id);
    // check exist category_id
    if (courseDto?.category_id)
      await this.#categoryService.findCategoryById(courseDto?.category_id);
    // calculation course  teacher
    if (courseDto?.teacher) {
      courseDto.teacher = await this.#calculationCourseTeacherOrStudent(
        "teacher",
        courseDto.teacher,
        this.#userModel,
      );
      await this.#alreadyExistTeacherInCourseById(id, courseDto.teacher);
      courseDto.teacher = [...courseDto.teacher, ...course.teacher];
    }
    // calculation course  student
    if (courseDto?.students) {
      courseDto.students = await this.#calculationCourseTeacherOrStudent(
        "students",
        courseDto.students,
        this.#userModel,
      );
      await this.#alreadyExistStudentInCourseById(id, courseDto.students);
      courseDto.students = [...courseDto.students, ...course.students];
    }
    // check start date and end date
    if (courseDto.startDate || courseDto.endDate) {
      if (courseDto.startDate === courseDto.endDate)
        throw new createHttpError.Conflict(CourseMessages.DateConflict);
      if (courseDto?.startDate && courseDto.endDate) {
        checkEndTimeGreaterThanStartTime(
          courseDto.startDate,
          courseDto.endDate,
        );
      }
      if (courseDto?.startDate)
        checkTimeGreaterThanNowTime(new Date(), courseDto.startDate);
    }
    // string to array fields
    if (courseDto?.materials && typeof courseDto.materials === "string")
      courseDto.materials = convertStringToArray(courseDto.materials);
    if (courseDto?.prerequisites && typeof courseDto.prerequisites === "string")
      courseDto.prerequisites = convertStringToArray(courseDto.prerequisites);
    if (courseDto?.topics && typeof courseDto.topics === "string")
      courseDto.topics = convertStringToArray(courseDto.topics);
    // create course
    courseDto = removeUndefinedObjectValues(courseDto);
    Object.assign(course, courseDto);
    let updateCourse = await course.save();
    if (!updateCourse)
      throw new createHttpError.InternalServerError(
        CourseMessages.UpdatedError,
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
  async findOneById(id) {
    const course = await this.#model.findById(id);
    if (!course) throw new createHttpError.NotFound(CourseMessages.NotFound);
    return course;
  }
  async #alreadyExistTeacherInCourseById(courseId, teacherIdArray) {
    const course = await this.findOneById(courseId);
    for (const courseTeacherId of course.teacher) {
      for (const teacherIdElement of teacherIdArray) {
        if (courseTeacherId.toString() == teacherIdElement)
          throw new createHttpError.Conflict(
            teacherIdElement + " " + CourseMessages.TeacherExist,
          );
      }
    }
  }
  async #alreadyExistStudentInCourseById(courseId, studentIdArray) {
    const course = await this.findOneById(courseId);
    for (const courseStudentId of course.teacher) {
      for (const studentIdElement of studentIdArray) {
        if (courseStudentId.toString() == studentIdElement)
          throw new createHttpError.Conflict(
            studentIdElement + " " + CourseMessages.StudentExist,
          );
      }
    }
  }
}
module.exports = { CourseService: new CourseService() };

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
  checkValidObjectId,
} = require("../../common/utils/functions");
const { UserModel } = require("../user/user.model");
const { formatISO9075 } = require("date-fns");
const { Types } = require("mongoose");
const { OptionMessages } = require("../option/option.messages");

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
    checkValidObjectId(id);
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
  async getAll() {
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
          from: "users",
          localField: "teacher",
          foreignField: "_id",
          as: "teacher",
        },
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
          localField: "students",
          foreignField: "_id",
          as: "students",
        },
      },
      {
        $lookup: {
          from: "seasons",
          localField: "seasons",
          foreignField: "_id",
          as: "seasons",
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $project: this.getCourseProjection(),
      },
    ]);
  }
  async getOneCourse(courseId) {
    checkValidObjectId(courseId);
    let course = await this.#model.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(courseId),
        },
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
          from: "users",
          localField: "teacher",
          foreignField: "_id",
          as: "teacher",
        },
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
          localField: "students",
          foreignField: "_id",
          as: "students",
        },
      },
      {
        $lookup: {
          from: "seasons",
          localField: "seasons",
          foreignField: "_id",
          as: "seasons",
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $project: this.getCourseProjection(),
      },
    ]);
    if (course.length > 0) return course[0];
    throw new createHttpError.NotFound(CourseMessages.NotFound);
  }
  getCourseProjection() {
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
      "teacher.otp": 0,
      "teacher.phone": 0,
      "teacher.verified_phone": 0,
      "teacher.brith_date": 0,
      "teacher.discount": 0,
      "teacher.wallet_balance": 0,
      "teacher.__v": 0,
      "teacher.role": 0,
      "teacher.email": 0,
      "students.otp": 0,
      "students.phone": 0,
      "students.verified_phone": 0,
      "students.brith_date": 0,
      "students.discount": 0,
      "students.wallet_balance": 0,
      "students.__v": 0,
      "students.role": 0,
      "students.email": 0,
      "category.icon": 0,
      "category.parent": 0,
      "category.parents": 0,
      "category.depth": 0,
      category_id: 0,
      __v: 0,
    };
  }
  async remove(courseId) {
    // check exist course
    await this.findOneById(courseId);
    // remove  course
    const removeCourse = await this.#model.deleteOne({ _id: courseId });
    if (removeCourse.deletedCount == 0)
      throw new createHttpError.InternalServerError(
        CourseMessages.RemovedError,
      );
    return true;
  }
}
module.exports = { CourseService: new CourseService() };

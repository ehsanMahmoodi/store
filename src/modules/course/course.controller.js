const autoBind = require("auto-bind");
const { CourseService } = require("./course.service");
const { CourseMessages } = require("./course.messages");
const HttpCodes = require("http-status-codes");
const {
  ListOfImagesFromRequest,
  convertStringToArray,
} = require("../../common/utils/functions");
const {
  createCourseValidation,
  updateCourseValidation,
} = require("./course.validations");

class CourseController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = CourseService;
  }
  async create(req, res, next) {
    try {
      const {
        body: {
          name,
          description,
          author,
          teacher,
          price,
          category_id,
          startDate,
          endDate,
          duration,
          level,
          format,
          materials,
          capacity,
          prerequisites,
          topics,
          students,
          type,
        },
      } = req;
      let allTeacher = teacher;
      if (typeof allTeacher === "string")
        allTeacher = convertStringToArray(teacher);
      let allStudent = students;
      if (typeof allStudent === "string")
        allStudent = convertStringToArray(students);
      await createCourseValidation.validateAsync({
        category_id,
        name,
        description,
        allTeacher,
        allStudent,
        price,
        startDate,
        endDate,
        duration,
        level,
        format,
        type,
        capacity,
      });
      let images;
      if (req?.fileUploadPath && req?.fileName)
        images = ListOfImagesFromRequest(req.files, req.fileUploadPath);
      await this.#service.create({
        author: req?.user?._id,
        name,
        description,
        teacher: allTeacher,
        price,
        category_id,
        images,
        startDate,
        endDate,
        duration,
        level,
        format,
        materials,
        capacity,
        prerequisites,
        topics,
        students: allStudent,
        type,
      });
      res.status(HttpCodes.CREATED).send({
        statusCode: res.statusCode,
        data: {
          message: CourseMessages.Created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const {
        params: { id },
        body: {
          name,
          description,
          author,
          teacher,
          price,
          category_id,
          startDate,
          endDate,
          duration,
          level,
          format,
          materials,
          capacity,
          prerequisites,
          topics,
          students,
          type,
        },
      } = req;
      let allTeacher = teacher;
      if (typeof allTeacher === "string")
        allTeacher = convertStringToArray(teacher);
      let allStudent = students;
      if (typeof allStudent === "string")
        allStudent = convertStringToArray(students);
      await updateCourseValidation.validateAsync({
        category_id,
        name,
        description,
        allTeacher,
        allStudent,
        price,
        startDate,
        endDate,
        duration,
        level,
        format,
        type,
        capacity,
      });
      let images;
      if (req?.fileUploadPath && req?.fileName)
        images = ListOfImagesFromRequest(req.files, req.fileUploadPath);
      await this.#service.update(id, {
        name,
        description,
        teacher: allTeacher,
        price,
        category_id,
        images,
        startDate,
        endDate,
        duration,
        level,
        format,
        materials,
        capacity,
        prerequisites,
        topics,
        students: allStudent,
        type,
      });
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          message: CourseMessages.Updated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      const courses = await this.#service.getAll();
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          courses,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneCourse(req, res, next) {
    try {
      const {
        params: { id },
      } = req;
      const course = await this.#service.getOneCourse(id);
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          course,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const {
        params: { id },
      } = req;

      await this.#service.remove(id);
      res.status(HttpCodes.OK).send({
        statusCode: res.statusCode,
        data: {
          message: CourseMessages.Removed,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { CourseController: new CourseController() };

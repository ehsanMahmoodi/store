const autoBind = require("auto-bind");
const { SeasonModel } = require("./seasons.model");
const { CourseModel } = require("../course/course.model");
const { CourseService } = require("../course/course.service");
const createHttpError = require("http-errors");
const { SeasonsMessages } = require("./seasons.messages");

class SeasonsService {
  #courseService;
  #courseModel;
  constructor() {
    autoBind(this);
    this.#courseService = CourseService;
    this.#courseModel = CourseModel;
  }
  async create(seasonDto) {
    // check exist course id
    const course = await this.#courseService.getOneCourse(seasonDto.course_id);
    // check exist season name in course
    await this.checkExistSeasonByName(seasonDto.course_id, seasonDto.name);
    // generate order
    seasonDto.order = course?.seasons?.length + 1;
    // create new season
    const newSeason = await this.#courseModel.updateOne(
      { _id: course._id },
      {
        $push: { seasons: seasonDto },
      },
    );
    if (newSeason.modifiedCount == 0)
      throw new createHttpError.InternalServerError(
        SeasonsMessages.CreatedError,
      );
    return true;
  }
  async checkExistSeasonByName(courseId, name) {
    const course = await this.#courseService.getOneCourse(courseId);
    if (course?.seasons) {
      course.seasons.map((season) => {
        if (season.name == name)
          throw new createHttpError.Conflict(SeasonsMessages.Conflict);
        return true;
      });
    }
    return true;
  }
}
module.exports = { SeasonsService: new SeasonsService() };

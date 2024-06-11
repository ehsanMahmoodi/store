const autoBind = require("auto-bind");
const { SeasonModel } = require("./seasons.model");
const { CourseModel } = require("../course/course.model");
const { CourseService } = require("../course/course.service");
const createHttpError = require("http-errors");
const { SeasonsMessages } = require("./seasons.messages");
const { Types } = require("mongoose");
const { removeUndefinedObjectValues } = require("../../common/utils/functions");

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
  async update(seasonId, seasonDto) {
    const { name, description, order } = seasonDto;
    seasonDto = removeUndefinedObjectValues(seasonDto);
    // check exist course
    const course = await this.#courseService.getOneCourse(seasonDto.course_id);
    const findSeason = await this.findSeasonById(course.seasons, seasonId);
    let data = Object.assign(findSeason, {
      ...seasonDto,
      _id: new Types.ObjectId(seasonId),
    });
    delete data?.course_id;
    let updateSeason = await this.#courseModel.updateOne(
      {
        "seasons._id": seasonId,
      },
      {
        $set: {
          "seasons.$": data,
        },
      },
    );
    if (updateSeason.modifiedCount == 0)
      throw new createHttpError.InternalServerError(
        SeasonsMessages.UpdatedError,
      );
    return true;
  }
  async findSeasonById(seasonList = [], seasonId) {
    const findSeason = seasonList.find((seasonItem) => {
      return seasonItem._id.toString() == seasonId;
    });
    if (!findSeason)
      throw new createHttpError.NotFound(SeasonsMessages.NotFound);
    return findSeason;
  }
  async remove(seasonId, courseId) {
    // check exist course
    const course = await this.#courseService.getOneCourse(courseId);
    const removeSeason = await this.#courseModel.updateOne(
      {
        _id: courseId,
      },
      {
        $pull: {
          seasons: {
            _id: seasonId,
          },
        },
      },
    );
    if (removeSeason.modifiedCount == 0)
      throw new createHttpError.InternalServerError(
        SeasonsMessages.RemovedError,
      );
    return true;
  }
}
module.exports = { SeasonsService: new SeasonsService() };

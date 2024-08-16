const autoBind = require("auto-bind");
const { CourseModel } = require("../course/course.model");
const createHttpError = require("http-errors");
const { EpisodeMessages } = require("./episode.messages");
const { Types } = require("mongoose");
const { removeUndefinedObjectValues } = require("../../common/utils/functions");
const { CourseMessages } = require("../course/course.messages");

class EpisodesService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = CourseModel;
  }
  async create(episodeDto) {
    episodeDto = removeUndefinedObjectValues(episodeDto);
    const course = await this.findCourseAndSeason(
      episodeDto.course_id,
      episodeDto.season_id,
    );
    await this.#model.updateOne(
      {
        _id: new Types.ObjectId(episodeDto.course_id),
        "seasons._id": new Types.ObjectId(episodeDto.season_id),
      },
      {
        $push: {
          "seasons.$.episodes": episodeDto,
        },
      },
    );
    return true;
  }
  async findCourseAndSeason(courseId, seasonId) {
    const course = await this.#model.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(courseId),
          "seasons._id": new Types.ObjectId(seasonId),
        },
      },
    ]);
    if (!course) throw new createHttpError.NotFound(CourseMessages.NotFound);
    return course;
  }
}

module.exports = { EpisodesService: new EpisodesService() };

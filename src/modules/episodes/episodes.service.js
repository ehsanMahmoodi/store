const autoBind = require("auto-bind");
const { CourseModel } = require("../course/course.model");
const createHttpError = require("http-errors");
const { Types } = require("mongoose");
const { removeUndefinedObjectValues } = require("../../common/utils/functions");
const { CourseMessages } = require("../course/course.messages");
const { EpisodeMessages } = require("./episode.messages");

class EpisodesService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = CourseModel;
  }
  async create(episodeDto) {
    episodeDto = removeUndefinedObjectValues(episodeDto);
    await this.findCourseAndSeason(episodeDto.course_id, episodeDto.season_id);
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
  async update(episodeDto) {
    const episode = await this.#model.findOne({
      _id: new Types.ObjectId(episodeDto.course_id),
      "seasons.$.episodes._id": new Types.ObjectId(episodeDto.episode_id),
    });
    if (!episode)
      throw new createHttpError.NotFound(EpisodeMessages.NotFoundCourse);
    const { episode_id, course_id, ...updateData } = episodeDto;
    await this.#model.updateOne(
      {
        _id: episodeDto.course_id,
        "seasons.episodes._id": episode_id,
      },
      {
        $set: {
          "seasons.$[].episodes.$[episodeElement]": updateData,
        },
      },
      {
        arrayFilters: [{ "episodeElement._id": episode_id }],
        new: true,
      },
    );
    return true;
  }
}

module.exports = { EpisodesService: new EpisodesService() };

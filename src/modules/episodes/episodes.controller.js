const autoBind = require("auto-bind");
const path = require("path");
const { createEpisodeValidation } = require("./episodes.validations");
const httpCodes = require("http-status-codes");
const { EpisodeMessages } = require("./episode.messages");
const { EpisodesService } = require("./episodes.service");
class EpisodesController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = EpisodesService;
  }
  async create(req, res, next) {
    try {
      console.log("fileUploadPath=>", req.fileUploadPath);
      console.log("fileName=>", req.fileName);
      let attachment = path.join(req.fileUploadPath, req.fileName);
      const {
        body: {
          course_id,
          season_id,
          title,
          description,
          isFreeAccess,
          video,
          time,
        },
      } = req;
      // await createEpisodeValidation.validateAsync({
      //   course_id,
      //   season_id,
      //   title,
      //   description,
      //   isFreeAccess,
      //   video,
      //   time,
      // });
      await this.#service.create({
        course_id,
        season_id,
        title,
        description,
        isFreeAccess,
        video,
        time,
        attachment,
      });
      res.status(httpCodes.CREATED).send({
        statusCode: res.statusCode,
        data: {
          message: EpisodeMessages.Created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { EpisodesController: new EpisodesController() };

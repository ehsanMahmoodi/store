const { Router } = require("express");
const { EpisodesController } = require("./episodes.controller");
const { uploadFile } = require("../../configs/multer.config");
const router = Router();
router.post(
  "/new",
  uploadFile("episode", "movie").single("attachment"),
  EpisodesController.create,
);
module.exports = {
  EpisodeRoutes: router,
};

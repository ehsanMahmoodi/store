const { Router } = require("express");
const { EpisodesController } = require("./episodes.controller");
const { uploadFile } = require("../../configs/multer.config");
const router = Router();
router.post(
  "/new",
  uploadFile("episode", "movie").single("attachment"),
  EpisodesController.create,
);
router.patch(
  "/update",
  uploadFile("episode", "movie").single("attachment"),
  EpisodesController.update,
);
module.exports = {
  EpisodeRoutes: router,
};

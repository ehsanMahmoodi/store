const { Schema } = require("mongoose");
const { episodeSchema } = require("../episodes/episodes.model");
const seasonSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    order: { type: Number, default: 1 },
    episodes: { type: [episodeSchema], default: [] },
  },
  {
    versionKey: false,
    id: false,
  },
);
module.exports = { seasonSchema };

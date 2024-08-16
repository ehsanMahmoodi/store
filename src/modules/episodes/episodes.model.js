const { Schema, Types } = require("mongoose");

const episodeSchema = new Schema(
  {
    season_id: { type: Types.ObjectId, ref: "season" },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    isFreeAccess: { type: Boolean, default: true },
    video: { type: String, default: "" },
    time: { type: Number, default: 0 },
    attachment: { type: [String], default: [] },
  },
  {
    versionKey: false,
    id: false,
  },
);
module.exports = { episodeSchema };

const { Schema} = require("mongoose");
const seasonSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    order: { type: Number, default: 1 },
  },
  {
    versionKey: false,
    id: false,
  },
);
module.exports = { seasonSchema };

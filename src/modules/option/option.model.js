const { Schema, Types, model } = require("mongoose");
const optionSchema = new Schema(
  {
    name: { type: String, required: true },
    key: { type: String, required: true },
    description: { type: String, default: "" },
    field_type: {
      type: String,
      required: true,
      enum: ["string", "number", "boolean", "array"],
    },
    is_required: { type: Boolean, default: false },
    product_id: { type: Types.ObjectId, required: true, ref: "product" },
    enums: { type: Array, default: [] },
  },
  {
    versionKey: false,
  },
);
const OptionModel = model("option", optionSchema);
module.exports = { OptionModel };

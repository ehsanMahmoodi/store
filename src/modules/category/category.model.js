const { Schema, Types, model } = require("mongoose");
const categorySchema = new Schema(
  {
    fa_name: { type: String, required: true },
    en_name: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    icon: { type: String, default: "" },
    parent: { type: Types.ObjectId, ref: "category", default: null },
    parents: { type: [Types.ObjectId], ref: "category", default: [] },
    depth: { type: Number, default: 0 },
  },
  { toJSON: { virtuals: true }, versionKey: false, id: false },
);
categorySchema.virtual("children", {
  ref: "category",
  localField: "_id",
  foreignField: "parent",
});
function autoPopulate(next) {
  this.populate([{ path: "children" }]);
  next();
}
categorySchema.pre("find", autoPopulate).pre("findOne", autoPopulate);
const CategoryModel = model("category", categorySchema);
module.exports = { CategoryModel };

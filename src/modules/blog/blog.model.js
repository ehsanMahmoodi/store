const { Schema, model, Types } = require("mongoose");
const blogSchema = new Schema(
  {
    author: { type: Types.ObjectId, required: true, ref: "user" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, default: "" },
    category_id: { type: Types.ObjectId, ref: "category", required: true },
    book_marks: { type: [Types.ObjectId], ref: "user", default: [] },
    likes: { type: [Types.ObjectId], ref: "user", default: [] },
    dis_likes: { type: [Types.ObjectId], ref: "user", default: [] },
    comments: { type: [Types.ObjectId], default: [] },
  },
  {
    timestamps: true,
  },
);
blogSchema.index({
  title: "text",
  description: "text",
  body: "text",
});
const BlogModel = model("blog", blogSchema);
module.exports = { BlogModel };

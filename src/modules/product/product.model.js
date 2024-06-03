const { Schema, model, Types } = require("mongoose");
const productSchema = new Schema({
  author: { type: Types.ObjectId, required: true, ref: "user" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount_code: { type: String, default: "" },
  discount_percentage: { type: Number, default: 0 },
  stock: { type: Number, default: null }, //تعداد موجودی محصول
  category_id: { type: Types.ObjectId, required: true, ref: "category" },
  images: { type: [String], required: true },
  status: {
    type: String,
    enum: ["available", "out of stock", "pre-order"],
    default: "available",
  },
  seller_id: { type: Types.ObjectId, required: true, ref: "user" },
  tags: { type: [String], default: [] },
  type: { type: String, required: true, enum: ["physical", "virtual"] },
  options: { type: Object, default: {} },
});
const ProductModel = model("product", productSchema);
module.exports = { ProductModel };

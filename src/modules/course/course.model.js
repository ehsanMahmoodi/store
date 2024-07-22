const { Schema, Types, model } = require("mongoose");
const { seasonSchema } = require("../seasons/seasons.model");

const courseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: Types.ObjectId, ref: "user", required: true },
    teacher: { type: [Types.ObjectId], ref: "user", required: true },
    price: { type: Number, required: true },
    category_id: { type: Types.ObjectId, ref: "category", required: true },
    images: { type: [String], default: [] },
    startDate: { type: Date, default: null }, // تاریخ شروع
    endDate: { type: Date, default: null }, // تاریخ پایان
    duration: { type: Number, default: 1 }, // مدت زمات دوره
    level: {
      type: String,
      enum: ["پیشرفته", "متوسط", "مبتدی"],
      required: true,
    }, // سطح دوره
    format: { type: String, enum: ["حضوری", "آنلاین"], required: true },
    materials: { type: [String], default: [] }, // منابع آموزشی
    capacity: { type: Number, default: 0 }, // ظرفیت دوره
    prerequisites: { type: [String], default: [] }, // پیش نیاز های دوره
    topics: { type: [String], default: [] }, // موضوعات دوره
    students: { type: [Types.ObjectId], ref: "user", default: [] },
    type: { type: String, enum: ["عادی", "ویژه"], default: "عادی" },
    seasons: { type: [seasonSchema], default: [] }, // فصل های دوره
  },
  {
    versionKey: false,
  },
);
const CourseModel = model("course", courseSchema);
module.exports = { CourseModel };

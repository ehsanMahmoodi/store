const { Schema, model } = require("mongoose");
const otpSchema = new Schema(
  {
    expiresIn: { type: String, default: "0" },
    code: { type: Number, default: undefined },
  },
  {
    versionKey: false,
    id: false,
  },
);
const userSchema = new Schema({
  avatar: { type: String, default: "" },
  first_name: { type: String, default: "" },
  last_name: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  verified_phone: { type: Boolean, default: false },
  brith_date: { type: String, default: "" },
  role: {
    type: String,
    enum: ["ADMIN", "WRITER", "TEACHER", "USER"],
    default: "USER",
  }, // نقش کاربر:ادمین-نویسنده-مدرس-کاربر عادی
  discount: { type: String, default: "" }, // کد تخفیف
  wallet_balance: { type: Number, default: 0 }, //موجودی کیف پول
  otp: {
    type: otpSchema,
    default: {
      expiresIn: 0,
      code: undefined,
    },
  },
});
const UserModel = model("user", userSchema);
module.exports = { UserModel };

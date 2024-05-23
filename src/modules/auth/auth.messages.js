const AuthMessages = Object.freeze({
  OtpNotExpired: "رمز یکبارمصرف هنوز منقضی نشده است.",
  OtpSendError:
    "مشکلی در ارسال رمز یکبار مصرف پیش آمده لطفا مجددا امتحان کنید.",
  NotFound: "کاربر یافت نشد.",
  OtpExpired: "رمز یکبارمصرف منقضی شده است. مجددا کد را دریافت کنید.",
  OtpCodeNotMatch: "رمز یکبارمصرف صحیح نمی باشد.",
  LoginSuccessfully: "باموفقیت وارد شدید.",
  Unauthorized: "لطفا وارد حساب کاربری خود شوید.",
});
module.exports = { AuthMessages };

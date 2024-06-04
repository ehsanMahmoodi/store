const CourseMessages = Object.freeze({
  Created: "دوره با موفقیت اضافه شد.",
  CreatedError: "مشکلی در ایجاد دوره به وجود آمده.",
  NotFound: "دوره یافت نشد.",
  Updated: "دوره با موفقیت بروزرسانی شد.",
  UpdatedError: "مشکلی در بروزرسانی دوره به وجود آمده.",
  Removed: "دوره با موفقیت حذف شد.",
  RemovedError: "مشکلی در حذف دوره به وجود آمده.",
  DateConflict: "تاریخ شروع و پایان دوره نمی تواند یکسان باشد.",
  TeacherExist: "مدرس قبلا داخل دوره اضافه شده است",
  StudentExist: "دانش آموز قبلا داخل دوره اضافه شده است",
});
module.exports = { CourseMessages };

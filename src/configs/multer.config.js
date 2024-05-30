const multer = require("multer");
const fs = require("fs");
const path = require("path");
const createHttpError = require("http-errors");

function createRoute(folderName, req) {
  const uploadFilePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    folderName,
  );
  req.fileUploadPath = path.join("uploads", folderName);
  fs.mkdir(uploadFilePath, { recursive: true }, (err) => {
    if (err) console.log(err);
  });
  return uploadFilePath;
}

const storage = (folderName, fileType) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const route = createRoute(folderName, req);
      cb(null, route);
    },
    filename: function (req, file, cb) {
      const extname = path.extname(file.originalname);
      const allowedImageFileExtList = [".jpg", ".jpeg", ".png", ".webp"];
      const allowedMovieFileExtList = [".mp4", ".mkv"];
      const allowedAudioExtList = [".mp3", ".m4a"];
      const allowedFileExtList = [".rar", ".zip"];
      let allowedExtList;
      switch (fileType.toLowerCase()) {
        case "image":
          allowedExtList = allowedImageFileExtList;
          break;
        case "movie":
          allowedExtList = allowedMovieFileExtList;
          break;
        case "audio":
          allowedExtList = allowedAudioExtList;
          break;
        case "file":
          allowedExtList = allowedFileExtList;
          break;
        default:
          throw new createHttpError.BadRequest("نوع فایل نامعتبر است.");
      }
      if (!allowedExtList.includes(extname.toLowerCase())) {
        return cb(
          new createHttpError.BadRequest(
            `فرمت فایل ارسالی صحیح نمی باشد. فرمت‌های مجاز: (${allowedExtList.join(", ")})`,
          ),
        );
      }
      const fileName = Date.now() + extname;
      req.fileName = fileName;
      cb(null, fileName);
    },
  });
const uploadFile = (folderName, fileType) =>
  multer({
    storage: storage(folderName, fileType),
  });
module.exports = { uploadFile };

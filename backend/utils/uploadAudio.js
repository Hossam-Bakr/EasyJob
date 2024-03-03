const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const ApiError = require("./ApiError");

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("audio")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only Audios allowed", 400), false);
    }
  };

  const uniqueFileName = function (req, file, cb) {
    cb(null, `${uuidv4()}-${file.originalname}`);
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    // 3 MB
    limits: { fileSize: 1024 * 1024 * process.env.MAX_FILE_SIZE_IN_MB },
    dest: "uploads/voices",
    filename: uniqueFileName,
  });

  return upload;
};

exports.uploadAudio = (fieldName) => multerOptions().single(fieldName);
exports.uploadMixOfAudios = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);

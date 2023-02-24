const multerS3 = require("multer-s3");
const multer = require("multer");
const AWS = require("aws-sdk");
const path = require("path");

const s3 = new AWS.S3({
  accessKeyId: "AKIAQ4DZ6TMIMVOL6DR2",
  secretAccessKey: "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",
  rigion: "ap-northeast-2",
});

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "capstone-transcribe-bucket",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, file.originalname);
    },
  }),
});

module.exports = upload;

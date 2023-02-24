const router = require("express").Router();
const bodyParser = require("body-parser");
const comprehendctrl = require("../controllers/comprehend.js");
const transcribectrl = require("../controllers/transcribe.js");
const wordcloudctrl = require("../controllers/wordcloud.js");
const getS3ctrl = require("../controllers/getS3");
const exist = require("../controllers/s3exist");
const upload = require("../controllers/multer.js");
router.use(bodyParser.json());
const BUCKET_NAME = "capstone-transcribe-bucket";

const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: "AKIAQ4DZ6TMIMVOL6DR2",
  secretAccessKey: "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",
});
router.post(
  "/voice",
  upload.fields([{ name: "id" }, { name: "record" }]),
  (req, res) => {
    var result = {};
    if (!req.files) {
      console.log("File was not found");
      result.is_success = 0;
      res.json(result);
      return;
    }

    var file_name = req.file.originalname.substring(0, 8);
    exist.exists(file_name + ".mp3").then(function (result) {
      if (result == 1) {
        result.is_success = 1;
        res.json(result);
      }
    });
  }
);

router.get("/convertedtxt", (req, res) => {
  var result = {};

  exist.exists(req.query.date + ".mp3").then(function (result) {
    if (result == 1) {
      transcribectrl.run(req.query.date);
    }
  });
});

router.get("/sentiment", (req, res) => {
  // res.json("test message");
  exist.exists(req.query.date + ".mp3").then(function (result) {
    if (result == 1) {
      getS3ctrl.run(req.query.date + ".json").then(function (result) {
        var item = JSON.parse(result.Body);
        var paramKey = item.results.transcripts[0].transcript;

        var sentiment_param = {
          LanguageCode: "ko",
          TextList: [JSON.stringify(paramKey)],
        };

        comprehendctrl.get_sentiment(sentiment_param).then(function (result) {
          res.json(result);
        });
      });
    }
  });
});

router.get("/wordcloud", (req, res) => {
  //const path = res.sendFile;
  exist.exists(req.query.date + ".mp3").then(function (result) {
    if (result == 1) {
      getS3ctrl.run(req.query.date + ".json").then(function (result) {
        var item = JSON.parse(result.Body);
        var paramKey = item.results.transcripts[0].transcript;

        wordcloudctrl.wordcloud(paramKey).then(function (result) {
          console.log(result);
        });
      });
    }
  });
});

module.exports = router;

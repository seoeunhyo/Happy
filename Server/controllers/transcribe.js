const { StartTranscriptionJobCommand } = require("@aws-sdk/client-transcribe");
const trans = require("./transcribeClient.js");

const run = async (date) => {
  try {
    let url =
      "https://capstone-transcribe-bucket.s3.ap-northeast-2.amazonaws.com/" +
      date +
      ".mp3";
    const params = {
      TranscriptionJobName: date,
      MediaFormat: "mp3",
      Media: {
        MediaFileUri: url,
      },
      OutputBucketName: "capstone-transcribe-bucket",
      LanguageCode: "ko-KR",
    };

    await trans.send(new StartTranscriptionJobCommand(params));
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = { run };

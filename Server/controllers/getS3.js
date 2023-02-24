const BUCKET_NAME = "capstone-transcribe-bucket";

const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: "AKIAQ4DZ6TMIMVOL6DR2",
  secretAccessKey: "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",
});

async function run(attachmentId) {
  const file = await s3
    .getObject({ Bucket: BUCKET_NAME, Key: attachmentId })
    .promise();

  return file;
}

module.exports = {
  run,
};

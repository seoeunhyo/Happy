const BUCKET_NAME = "capstone-transcribe-bucket";

const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: "AKIAQ4DZ6TMIMVOL6DR2",
  secretAccessKey: "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",
});

async function exists(file_name) {
  try {
    const objectParams_url = {
      Bucket: BUCKET_NAME,
      Key: file_name,
    };
    await s3.headObject(objectParams_url).promise();

    return 1;
  } catch (headErr) {
    if (headErr.code === "NotFound") {
      return 0;
    }
  }
  return objectParams_url;
  // return s3.getSignedUrl("getObject"), objectParams_url, callback;

  //return s3.headObject(objectParams_url).promise();
}
module.exports = { exists };

const Trans = require("@aws-sdk/client-transcribe");

const transcribeClient = new Trans.TranscribeClient({
  region: "ap-northeast-2",
});

module.exports = transcribeClient;

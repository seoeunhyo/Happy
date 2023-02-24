const aws = require("aws-sdk");
aws.config.loadFromPath(
  "C:/Users/ssh99/restful test/nodejs-express-mysql/config/config.json"
);
var comprehend = new aws.Comprehend({
  apiVersion: "2017-11-27",
});

//comprehend result return
async function get_sentiment(param) {
  const file = await comprehend.batchDetectSentiment(param).promise();
  const sentimentScore = file.ResultList[0].SentimentScore;
  const sentiment = file.ResultList[0].Sentiment;

  while (true) {
    if (sentiment == "POSITIVE") {
      if (sentimentScore["Positive"] >= 0.75) {
        return "최고에요!";
      }
      if (sentimentScore["Positive"] >= 0.5) {
        return "좋아요";
      }
    }
    if (sentiment == "NEGATIVE") {
      if (sentimentScore["Negative"] >= 0.75) {
        return "최악이에요.";
      }
      if (sentimentScore["Negative"] >= 0.5) {
        return "별로에요.";
      }
    }
    if (sentiment == "NEUTRAL") {
      return "보통이에요.";
    }
    if (sentiment == "MIXED") {
      return "보통이에요.";
    }
  }
}

module.exports = { get_sentiment };

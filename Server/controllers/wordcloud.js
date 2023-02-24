//load cloud.py

const spawn = require("child_process").spawn;
const { resolve } = require("path");
const getS3ctrl = require("../controllers/getS3");

async function wordcloud(will_convert_data) {
  //python file load
  try {
    const python = spawn("python3", [
      "C:/Users/ssh99/restful test/nodejs-express-mysql/controllers/cloud.py",
      will_convert_data,
    ]);
    await new Promise((resolve, reject) => {
      python.stdout.on("data", function (data) {
        return data.toString();
      });
      return 1;
    });

    return 1;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  wordcloud,
};

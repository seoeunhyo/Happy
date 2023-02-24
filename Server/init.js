// var server = http.createServer(app).listen(app.get("port"), function () {
//   console.log("익스프레스로 웹 서버를 실행함 : " + app.get("port"));
// });
//module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

//require("./routes/routes.js")(app);
app.use(require("./routes/routes"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

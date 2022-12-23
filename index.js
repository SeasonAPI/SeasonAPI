const express = require("express");
const syc = require("syc-logger");
const app = express();
const chalk = require("chalk");
const getCurrentSeason = () => {
  const date = new Date();
  const month = date.getMonth();
  let season;

  if (month > 2 && month < 6) {
    season = "spring";
  } else if (month > 5 && month < 9) {
    season = "summer";
  } else if (month > 8 && month < 12) {
    season = "autumn";
  } else {
    season = "winter";
  }
  return season;
};

app.get("/", (req, res) => {
  res.json({ status: "Success!" });
  res.status(200);
});
app.get("/api", (req, res) => {
  res.json({ season: `${getCurrentSeason()}` });
  res.status(200);
});
app.get("/api/custom", (req, res) => {
  const month = req.query.month;

  let season;

  if (month >= 2 && month <= 4) {
    season = "spring";
  } else if (month >= 4 && month <= 6) {
    season = "summer";
  } else if (month >= 6 && month <= 8) {
    season = "rainy";
  } else if (month >= 8 && month <= 10) {
    season = "autumn";
  } else if (month >= 10 && month <= 12) {
    season = "late autumn";
  } else {
    season = "winter";
  }
  res.json({ season: `${season}` });
  res.status(200);
});

app.listen(3000, () => {
  syc.logEmoji("Server started", 1, "#FFFFF", "🍂");
  console.log(chalk.bold(syc.logEmojiAsync("API Created.")));
  console.log(
    chalk.bold(
      chalk.red("[ ") +
        chalk.cyan("BACKEND MANAGER ") +
        chalk.red("] ") +
        chalk.yellow(": ") +
        chalk.green("BACKEND CONNECTED!")
    )
  );
});

const express = require("express");
const syc = require("syc-logger");
const app = express();
const { getCurrentSeason, generateApiKey } = require("./functions/index.js");
const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();
app.get("/", (req, res) => {
  res.send("<a href='/api/keys'>Get API Key</a>");
  res.status(200);
});

mongoose
  .connect(
    `mongodb+srv://SAPIAuthor:${process.env.DB_PASS}@seasonapi.fo1uxqt.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() =>
    console.log(
      chalk.green.bold("[ ") +
        chalk.cyan.bold("DATABASE MANAGER") +
        chalk.green.bold(" ]") +
        chalk.yellowBright(": ") +
        chalk.greenBright.bold("MongoDB") +
        chalk.red.bold.underline.italic(" Connected.")
    )
  )
  .catch((err) => console.log(err));
const apiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ApiKey = mongoose.model("ApiKey", apiKeySchema);

app.get("/api/keys", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api/keys", (req, res) => {
  const key = generateApiKey();
  const apiKey = new ApiKey({ key });
  apiKey.save((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send({ key });
  });
});

function validateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"] || req.query.api_key;
  if (!apiKey) {
    return res.status(401).send({ message: "No API key provided" });
  }
  ApiKey.findOne({ key: apiKey }, (err, key) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!key) {
      return res.status(401).send({ message: "Invalid API key" });
    }
    next();
  });
}

app.get("/api/get-current-season", validateApiKey, (req, res) => {
  res.json({ season: `${getCurrentSeason()}` });
  res.status(200);
});
app.get("/api/get-season/custom", validateApiKey, (req, res) => {
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
let PORT = 3069;
app.listen(PORT, () => {
  console.log(
    chalk.bold.red("[ ") +
      chalk.cyanBright.bold("SERVER MANAGER") +
      chalk.bold.red(" ]") +
      chalk.bold.yellow(": ") +
      chalk.blueBright.bold("SERVER STARTED") +
      chalk.bold.green(" LISTENING TO") +
      chalk.bold.yellow(": ") +
      chalk.bold.underline.redBright("http://localhost") +
      chalk.bold.yellow.underline(":") +
      chalk.bold.magenta.underline(`${PORT}`)
  );
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

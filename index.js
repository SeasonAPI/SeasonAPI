const express = require("express");
const syc = require("syc-logger");
const app = express();
const mongoose = require("mongoose");
const chalk = require("chalk");
require("./google.connect");
const {
  generateApiKey,
  getCurrentSeasonBDINNL,
} = require("./functions/index.js");
require("dotenv").config();

// FUNCTIONS
const getCurrentSeason = () => {
  const date = new Date();
  const currentMonth = date.getMonth();
  let season;

  if (currentMonth <= 3 && currentMonth >= 5) {
    season = "spring";
  } else if (currentMonth <= 6 && currentMonth >= 8) {
    season = "summer";
  } else if (currentMonth <= 9 && currentMonth >= 11) {
    season = "autumn";
  } else {
    season = "winter";
  }
  return season;
};

const date = new Date();

const getCurrentYear = date.getFullYear();
const getTime = date.toLocaleTimeString();
const getDate = date.getDate();
let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getMonthName = monthNames[date.getMonth()];

const getDayName = dayNames[date.getDay()];

app.get("/", (req, res) => {
  res.send("<a href='/api/keys'>Get API Key</a>");
  res.status(200);
});

mongoose
  .connect(`${process.env.MongoDB}`, { useNewUrlParser: true })

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
mongoose.set("strictQuery", true);
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
  const country = req.query.country;
  try {
    if (country === "bd" || country === "in" || country === "nl") {
      res
        .json({
          season: `${getCurrentSeasonBDINNL()}`,
          date: `${getDate}`,
          month: `${getMonthName}`,
          day: `${getDayName}`,
          year: `${getCurrentYear}`,
        })
        .status(200);
    } else {
      res.json({
        season: `${getCurrentSeason()}`,
        date: `${getDate}`,
        month: `${getMonthName}`,
        day: `${getDayName}`,
        year: `${getCurrentYear}`,
      });
      res.status(200);
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
app.get("/api/get-season/custom", validateApiKey, (req, res) => {
  const currentMonth = req.query.month;

  let season;

  if (currentMonth >= 3 && currentMonth <= 5) {
    season = "spring";
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    season = "summer";
  } else if (currentMonth >= 9 && currentMonth <= 11) {
    season = "autumn";
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
      chalk.bold.underline.redBright.italic("http://localhost") +
      chalk.bold.yellow.underline(":") +
      chalk.bold.magenta.underline(`${PORT}`)
  );
  console.log(chalk.bold.italic(syc.logEmojiAsync("API Created.")));
  console.log(
    chalk.bold(
      chalk.red.italic("[ ") +
        chalk.cyan.italic("Backend Manager ") +
        chalk.red.italic("] ") +
        chalk.yellow.italic(": ") +
        chalk.green.italic("Backend Connected!")
    )
  );
});

const express = require("express");
const syc = require("syc-logger");
const app = express();
const { getCurrentSeason } = require("./functions/index.js");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const mongodb = require("mongodb");

app.use(bodyParser.json());
const url = "mongodb://localhost:27017";
const dbName = "SeasonAPIDB";

mongodb.MongoClient.connect(
  url,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      console.log(error);
      return;
    }

    const db = client.db(dbName);

    app.post("/api/key", (req, res) => {
      const apiKey = uuidv4();

      db.collection("apiKeys").insertOne({ apiKey }, (error) => {
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }
        res.json({ apiKey });
      });
    });
  }
);

app.use((req, res, next) => {
  // Check if the API key is present in the request
  const apiKey = req.headers["x-api-key"] || req.body.apiKey;
  if (!apiKey) {
    res.sendStatus(401);
    return;
  }

  // Verify the API key against the database
  db.collection("apiKeys").findOne({ apiKey }, (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }

    if (!result) {
      res.sendStatus(401);
      return;
    }

    // Allow the request to continue if the API key is valid
    next();
  });
});

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

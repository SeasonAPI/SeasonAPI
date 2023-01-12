import { exec } from "child_process";
import * as express from "express";
import * as syc from "syc-logger";
import * as mongoose from "mongoose";
import * as chalk from "chalk";
import * as cron from "node-cron";
import * as path from "path";
import { getCurrentSeasonBDINNL, generateApiKey } from "../index";
require("dotenv").config();

const app = express();
const API = () => {
  try {
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
      let currentSeason = season.charAt(0).toUpperCase() + season.slice(1);
      return currentSeason;
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

    app.get("/", (req: any, res: any) => {
      res.send("<a href='/api/keys'>Get API Key</a>");
      res.status(200);
    });
    mongoose.set("strictQuery", false);
    mongoose
      .connect(`${process.env.MongoDB}`)

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
      .catch((err: any) => console.log(err));

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

    app.get("/api/keys", (req: any, res: any) => {
      const filePath = path.join(__dirname, "../../", "index.html");
      res.sendFile(filePath);
    });

    app.post("/api/keys", (req: any, res: any) => {
      const key = generateApiKey();
      const apiKey = new ApiKey({ key });
      apiKey.save((err: any) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        res.send({ key });
      });
    });

    const validateApiKey = (req: any, res: any, next: any) => {
      const apiKey = req.headers["x-api-key"] || req.query.api_key;
      if (!apiKey) {
        return res.status(600).send({ message: "No API key provided" });
      }
      ApiKey.findOne({ key: apiKey }, (err: string, key: string) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (!key) {
          return res.status(600).send({ message: "Invalid API key" });
        }
        next();
      });
    };

    app.get("/api/get-current-season", validateApiKey, (req: any, res: any) => {
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
              footer: `Season provided by Sayln SeasonAPI`,
            })
            .status(200);
        } else if (!country) {
          res.status(601).json({ error: "No country provided", status: 400 });
        } else {
          res.json({
            season: `${getCurrentSeason()}`,
            date: `${getDate}`,
            month: `${getMonthName}`,
            day: `${getDayName}`,
            year: `${getCurrentYear}`,
            footer: `Season provided by Sayln SeasonAPI`,
          });
          res.status(200);
        }
      } catch (err) {
        res.status(500).json({ error: err });
      }
    });
    app.get("/api/get-season/custom", validateApiKey, (req: any, res: any) => {
      const currentMonth = req.query.month;

      let season;

      const country = req.query.country;
      try {
        if (country === "bd" || country === "in" || country === "nl") {
          let season;

          if (currentMonth >= 3 && currentMonth <= 4) {
            season = "spring";
          } else if (currentMonth >= 5 && currentMonth <= 6) {
            season = "summer";
          } else if (currentMonth >= 7 && currentMonth <= 8) {
            season = "rainy";
          } else if (currentMonth >= 9 && currentMonth <= 10) {
            season = "autumn";
          } else if (currentMonth >= 11 && currentMonth < 12) {
            season = "late autumn";
          } else {
            season = "winter";
          }
          let currentSeason = season.charAt(0).toUpperCase() + season.slice(1);
          res
            .json({
              season: `${currentSeason}`,
              date: `${getDate}`,
              month: `${getMonthName}`,
              day: `${getDayName}`,
              year: `${getCurrentYear}`,
              footer: `Season provided by Sayln SeasonAPI`,
            })
            .status(200);
        } else if (!country) {
          res.status(601).json({ error: "No country provided", status: 400 });
        } else {
          if (currentMonth >= 3 && currentMonth <= 5) {
            season = "spring";
          } else if (currentMonth >= 6 && currentMonth <= 8) {
            season = "summer";
          } else if (currentMonth >= 9 && currentMonth <= 11) {
            season = "autumn";
          } else {
            season = "winter";
          }
          let currentSeason = season.charAt(0).toUpperCase() + season.slice(1);
          res.json({
            season: `${currentSeason}`,
            date: `${getDate}`,
            month: `${getMonthName}`,
            day: `${getDayName}`,
            year: `${getCurrentYear}`,
            footer: `Season provided by Sayln SeasonAPI`,
          });
          res.status(200);
        }
      } catch (err) {
        res.status(500).json({ error: err });
      }
    });
    let PORT = 3069 || 3070 || 3071 || 3072;
    const server = app.listen(PORT, () => {
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

    cron.schedule("0 * * * *", () => {
      console.log("Restarting server...");
      server.close(() => {
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
      });
    });
  } catch (err) {
    console.error(err);
    console.log("\n");
    console.log("\n");
    console.log("\n");
    exec("npm start", (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  }
};

export { API };

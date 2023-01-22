import { exec } from "child_process";
import * as express from "express";
import { Request, Response } from "express";
import * as syc from "syc-logger";
import * as mongoose from "mongoose";
import * as chalk from "chalk";
import * as cron from "node-cron";
import * as path from "path";
import fetch from "node-fetch";
import {
  getSeasonType,
  getCurrentSeasonBDINNL,
  generateApiKey,
  getCurrentSeason,
  getCurrentYear,
  getDayName,
  getMonthName,
  getDate,
  getSouthPoleSeason,
  getTime,
} from "../index";
require("dotenv").config();
import * as cors from "cors";

import * as fs from "fs";
import * as cheerio from "cheerio";
const spawn = require("child_process").spawn;
// const forever = require('forever-monitor');
import * as forever from "forever-monitor";

const app = express();
app.use(cors());

(function () {
  try {
    app.get("/", (req: Request, res: Response) => {
      const mainFilePath = path.join(__dirname, "../../", "main.html");
      res.sendFile(mainFilePath);
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

    app.get("/api/keys", (req: Request, res: Response) => {
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
        res.send({
          key,
          docs: "Now read the docs from https://seasonapi.iamsohom829.repl.co/docs",
        });
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

    app.get(
      "/api/get-current-season",
      validateApiKey,
      (req: Request, res: Response) => {
        const country = req.query.country;
        const pole = req.query.pole;
        try {
          if (pole === "north") {
            if (
              country === "bd" ||
              country === "in" ||
              country === "nl" ||
              country === "sri" ||
              country === "myn" ||
              country === "bangladesh" ||
              country === "india" ||
              country === "nepal" ||
              country === "sri lanka" ||
              country === "myanmar"
            ) {
              res
                .json({
                  season: `${getCurrentSeasonBDINNL()}`,
                  type: `${getSeasonType()}`,
                  date: `${getDate}`,
                  month: `${getMonthName}`,
                  day: `${getDayName}`,
                  year: `${getCurrentYear}`,
                  footer: `Season provided by Sayln SeasonAPI`,
                })
                .status(200);
            } else if (!country) {
              res
                .status(601)
                .json({ error: "No country provided", status: 400 });
            } else {
              res.json({
                season: `${getCurrentSeason()}`,
                date: `${getDate}`,
                month: `${getMonthName}`,
                day: `${getDayName}`,
                year: `${getCurrentYear}`,
                footer: `Season provided by Sayln SeasonAPI`,
              });
            }
            res.status(200);
          } else if (pole === "south") {
            res.json({
              season: `${getSouthPoleSeason()}`,
              date: `${getDate}`,
              month: `${getMonthName}`,
              day: `${getDayName}`,
              year: `${getCurrentYear}`,
              footer: `Season provided by Sayln SeasonAPI`,
            });
            res.status(200);
          } else if (!pole) {
            res.status(607).json({ message: `No pole provided` });
          } else {
            res.status(607).json({
              message: `Expected pole \`north\` and \`south\` but got \`${pole}\` instead`,
              status: 607,
            });
          }
        } catch (err) {
          res.status(500).json({ error: err });
        }
      }
    );
    app.get(
      "/api/get-season/custom",
      validateApiKey,
      (req: any, res: Response) => {
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
            let currentSeason =
              season.charAt(0).toUpperCase() + season.slice(1);
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
            let currentSeason =
              season.charAt(0).toUpperCase() + season.slice(1);
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
      }
    );
    app.get("/docs", (req: Request, res: Response) => {
      const docsPath = path.join(__dirname, "../../", "docs.html");
      res.sendFile(docsPath);
      res.status(200);
    });
    app.get("/example", async (req: Request, res: Response) => {
      const Path = path.join(__dirname, "../../", "example.html");
      res.sendFile(Path);
    });
    app.get("/example/season", async (req: Request, res: Response) => {
      try {
        const queryPole = req.query.pole;
        const stringPole = queryPole?.toString();
        const pole = stringPole?.toLowerCase();
        const response = await fetch(
          `https://seasonapi.iamsohom829.repl.co/api/get-current-season/?api_key=${process.env.APIKEY}&country=bd&pole=${pole}`
        );
        const body = await response.json();
        const season = body.season;
        const footer = body.footer;
        if (!season && body.message) {
          const error = body.message;
          fs.readFile("error.html", "utf8", (err, data) => {
            if (err) throw err;

            let $ = cheerio.load(data);
            $("h2").text(`${error}`);
            res.send($.html());
          });
        } else {
          fs.readFile("showExample.html", "utf8", (err, data) => {
            if (err) throw err;
            let $ = cheerio.load(data);
            $("h2").text(`${season}`);
            $("h3").text(`${footer}`);
            res.send($.html());
          });
        }
      } catch (error) {
        fs.readFile("error.html", "utf8", (err, data) => {
          if (err) throw err;

          let $ = cheerio.load(data);
          $("h2").text(`${error}`);
          res.send($.html());
        });
      }
    });
    let PORT = 3069 || 3070 || 3071 || 3072;
    let server = app.listen(PORT, () => {
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

    cron.schedule("*/5 * * * *", () => {
      PORT = PORT == 3000 ? 3001 : 3000;
      console.log("Restarting server..");
      server.close(() => {
        server = app.listen(PORT, () => {
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
    process.exit();
  }
})();

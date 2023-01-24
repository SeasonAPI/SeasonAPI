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
  getLong,
  getLat,
  getCountry,
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
import * as forever from "forever-monitor";
import { map } from "cheerio/lib/api/traversing";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../../", "client/build")));
// app.set("build", path.join(__dirname, "../../", "client/build/index.html"));

(function () {
  try {
    app.get(
      ["/", "/docs", "/example", "/example/season", "/api/keys"],
      (req: Request, res: Response) => {
        const mainFilePath = path.join(
          __dirname,
          "../../",
          "client/build/index.html"
        );
        res.sendFile(mainFilePath);
        res.status(200);
      }
    );
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
    const latLongMap = new Map();
    const countryMap = new Map();

    app.get("/full-api/get-current-season", async (req, res) => {
      const pole = req.query.pole;
      const apiKey = req.query.api_key;
      if (!apiKey) {
        return res.json({ message: `No API Key is provided. ` });
      } else if (!pole) {
        return res.json({ message: `No pole provided.` }).status(607);
      }
      const latitude = await getLat();
      const longitude = await getLong();
      latLongMap.set(`latitude`, latitude);
      latLongMap.set(`longitude`, longitude);

      const long = latLongMap.get(`longitude`);
      const lat = latLongMap.get(`latitude`);
      const country = await getCountry();
      countryMap.set(`country`, country);
      res.redirect(
        `/full-api/get-current-season/ogl/?api_key=${apiKey}&long=${long}&lat=${lat}&pole=${pole}&country=${countryMap.get(
          `country`
        )}`
      );
    });

    app.get(
      "/full-api/get-current-season/ogl/",
      validateApiKey,
      async (req: Request, res: Response) => {
        const country = req.query.country;
        const pole = req.query.pole;
        const lat = req.query.lat;
        const lon = req.query.long;
        const url = `http://climateapi.scottpinkelman.com/api/v1/location/${lat}/${lon}`;
        const resp = await fetch(url);
        const data = await resp.json();
        const koppen_geiger_zone = data.return_values[0].koppen_geiger_zone;
        const climate_zone = data.return_values[0].zone_description;

        if (!lat || !lon) {
          return res
            .json({
              message: `Lat long is required `,
              tip: `Go to /full-api/get-current-season to get your latitude and longitude`,
            })
            .status(609);
        }
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
                  koppen_geiger_zone: `${koppen_geiger_zone}`,
                  climate_zone: `${climate_zone}`,
                  footer: `Season provided by Sayln SeasonAPI`,
                })
                .status(200);
            } else if (!country) {
              res
                .status(601)
                .json({ error: "No country provided", status: 601 });
            } else {
              res.json({
                season: `${getCurrentSeason()}`,
                date: `${getDate}`,
                month: `${getMonthName}`,
                day: `${getDayName}`,
                year: `${getCurrentYear}`,
                koppen_geiger_zone: `${koppen_geiger_zone}`,
                climate_zone: `${climate_zone}`,
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
      "/full-api/get-season/custom",
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

"use strict";
/**
 * The `getCurrentSeason()` function is used to get the current season of the user.
 * It can be used anywhere. Discord, Browser or anything!
 * @returns Current Season
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentSeason = void 0;
const getCurrentSeason = () => {
    const date = new Date();
    const month = date.getMonth();
    let season;
    if (month >= 2 && month <= 4) {
        season = "spring";
    }
    else if (month >= 4 && month <= 6) {
        season = "summer";
    }
    else if (month >= 6 && month <= 8) {
        season = "rainy";
    }
    else if (month >= 8 && month <= 10) {
        season = "autumn";
    }
    else if (month >= 10 && month <= 12) {
        season = "late autumn";
    }
    else {
        season = "winter";
    }
    return season;
};
exports.getCurrentSeason = getCurrentSeason;
//# sourceMappingURL=season.js.map
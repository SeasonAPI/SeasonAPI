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
    const currentMonth = date.getMonth();
    let season;
    if (currentMonth <= 3 && currentMonth >= 5) {
        season = "spring";
    }
    else if (currentMonth <= 6 && currentMonth >= 8) {
        season = "summer";
    }
    else if (currentMonth <= 9 && currentMonth >= 11) {
        season = "autumn";
    }
    else {
        season = "winter";
    }
    return season;
};
exports.getCurrentSeason = getCurrentSeason;
//# sourceMappingURL=season.js.map
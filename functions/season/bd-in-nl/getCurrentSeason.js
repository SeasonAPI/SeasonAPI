"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentSeasonBDINNL = void 0;
const getCurrentSeasonBDINNL = () => {
    const date = new Date();
    const currentMonth = date.getMonth();
    let season;
    if (currentMonth >= 3 && currentMonth <= 4) {
        season = "spring";
    }
    else if (currentMonth >= 5 && currentMonth <= 6) {
        season = "summer";
    }
    else if (currentMonth >= 7 && currentMonth <= 8) {
        season = "rainy";
    }
    else if (currentMonth >= 9 && currentMonth <= 10) {
        season = "autumn";
    }
    else if (currentMonth >= 11 && currentMonth < 12) {
        season = "late autumn";
    }
    else {
        season = "winter";
    }
    let currentSeason = season.charAt(0).toUpperCase() + season.slice(1);
    return currentSeason;
};
exports.getCurrentSeasonBDINNL = getCurrentSeasonBDINNL;
//# sourceMappingURL=getCurrentSeason.js.map
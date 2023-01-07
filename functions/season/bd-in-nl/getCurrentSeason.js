"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentSeasonBDINNL = void 0;
const getCurrentSeasonBDINNL = () => {
    const date = new Date();
    const currentMonth = date.getMonth();
    let season;
    if (currentMonth <= 3 && currentMonth >= 4) {
        season = "spring";
    }
    else if (currentMonth <= 6 && currentMonth >= 7) {
        season = "summer";
    }
    else if (currentMonth <= 8 && currentMonth >= 9) {
        season = "rainy";
    }
    else if (currentMonth <= 10 && currentMonth >= 11) {
        season = "autumn";
    }
    else {
        season = "winter";
    }
    return season;
};
exports.getCurrentSeasonBDINNL = getCurrentSeasonBDINNL;
//# sourceMappingURL=getCurrentSeason.js.map
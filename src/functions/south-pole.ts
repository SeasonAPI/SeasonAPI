let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let season;
const getSouthPoleSeason = () => {
  if (currentMonth >= 11 || currentMonth <= 2) {
    season = "Winter";
  } else {
    season = "Summer";
  }
  return season;
};

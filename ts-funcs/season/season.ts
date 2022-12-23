const getCurrentSeason = () => {
  const date = new Date();
  const month = date.getMonth();
  let season;

  if (month > 2 && month < 6) {
    season = "spring";
  } else if (month > 5 && month < 9) {
    season = "summer";
  } else if (month > 8 && month < 12) {
    season = "autumn";
  } else {
    season = "winter";
  }
  return season;
};

export { getCurrentSeason };

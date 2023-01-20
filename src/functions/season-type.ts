const getSeasonType = () => {
  const date = new Date();
  const month = date.getMonth();
  let SeasonType;
  if (month >= 6 && month <= 11) {
    SeasonType = "rainy";
  } else {
    SeasonType = "dry";
  }

  return SeasonType;
};

export { getSeasonType };

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

export { getDayName, getMonthName, getCurrentYear, getTime, getDate };

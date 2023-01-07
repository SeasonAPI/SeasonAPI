"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthName = exports.getTime = exports.getCurrentYear = exports.getDayName = exports.getDate = void 0;
const date = new Date();
const getCurrentYear = date.getFullYear();
exports.getCurrentYear = getCurrentYear;
const getTime = date.toLocaleTimeString();
exports.getTime = getTime;
const getDate = date.getDate();
exports.getDate = getDate;
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
exports.getMonthName = getMonthName;
const getDayName = dayNames[date.getDay()];
exports.getDayName = getDayName;
//# sourceMappingURL=time.js.map
import fetch from "node-fetch";
require("dotenv");
const url = "https://ip-address-tracker-free.p.rapidapi.com/rapidapi/ip";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `0b10d639f3msh1cc58ee7d31b254p1ab259jsn7bab6c3bc4b8`,
    "X-RapidAPI-Host": "ip-address-tracker-free.p.rapidapi.com",
  },
};
const getLat = async () => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data.lat;
};
const getLong = async () => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data.lon;
};

const getCountry = async () => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data.country;
};

export { getLat, getLong, getCountry };

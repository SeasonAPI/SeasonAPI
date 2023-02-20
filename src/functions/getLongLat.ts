import fetch from "node-fetch";

const getIpData = async () => {
  const response = await fetch(
    "https://api.ipdata.co?api-key=682732ff8f53f6701c4e49427ddf18c2366496afa159a787ff1299e7"
  );
  const data = await response.json();
  return data;
};

const getLat = async () => {
  const data = await getIpData();
  return data.latitude;
};

const getLong = async () => {
  const data = await getIpData();
  return data.longitude;
};

const getCountry = async () => {
  const data = await getIpData();
  return data.country_name;
};

export { getLat, getLong, getCountry };

import axios from "axios";

const apiUrl = `https://api.pexels.com/v1`;
const apiKey = "TzcpPnidj9fqsMqRG0Yy7QK6biZgq0WbLISxlkClGHrsSbAyrhJHdPce";

export const getPhotos = async (page) => {
  const res = await axios.get(`${apiUrl}/curated?page=${page}&per_page=30`, {
    headers: {
      Authorization: `${apiKey}`,
    },
  });
  return res.data;
};

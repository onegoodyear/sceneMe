import axios from "axios";

const server_api = "https://sceneme.onrender.com";

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

if (!apiKey) {
  console.error("API Key is missing!");
}

const endpoints = {
  topRatedMovies: `/movie/top_rated?language=en-US&page=1`,
  topRatedShows: `/tv/top_rated?language=en-US&page=1`,
  trending: `/trending/all/day?language=en-US&page=1`,
  upComing: `/movie/upcoming?language=en-US&page=1`,
};

const fetchFromTMDB = (endpoint) => {
  return axios.get(`https://api.themoviedb.org/3${endpoint}&api_key=${apiKey}`);
};

export { endpoints, fetchFromTMDB, server_api };

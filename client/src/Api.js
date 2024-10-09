import axios from "axios";

const server_api = "http://scneme.onrender.com";

const api_key = process.env.REACT_APP_TMDB_API_KEY;

if (!api_key) {
  console.error("API Key is missing!");
}

const endpoints = {
  topRatedMovies: `/movie/top_rated?language=en-US&page=1`,
  topRatedShows: `/tv/top_rated?language=en-US&page=1`,
  trending: `/trending/all/day?language=en-US&page=1`,
  upComing: `/movie/upcoming?language=en-US&page=1`,
};

const fetchFromTMDB = (endpoint) => {
  return axios.get(
    `https://api.themoviedb.org/3${endpoint}&api_key=${api_key}`
  );
};

export { endpoints, fetchFromTMDB, server_api };

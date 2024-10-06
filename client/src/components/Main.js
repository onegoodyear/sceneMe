import requests from "../Api";
import { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
  const [mainMovie, setMainMovie] = useState(null);

  useEffect(() => {
    axios.get(requests.topRatedMovies).then((res) => {
      console.log(res.data.results);
      setMainMovie(
        res.data.results[Math.floor(Math.random() * res.data.results.length)]
      );
      console.log(mainMovie?.id);
    });
  }, []);

  return (
    <div className="w-full h-[600px] text-white">
      <div className="w-full h-[600px]">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black" />
        <img
          src={`https://image.tmdb.org/t/p/original/${mainMovie?.backdrop_path}`}
          alt={mainMovie?.title}
          className="object-cover w-full h-full"
        ></img>
      </div>
      <div className="content absolute w-full top-[25%] container">
        <h1 className="text-2xl md:text-4xl font-bold">{mainMovie?.title}</h1>
        <div className="my-4">
          <button className="px-5 py-2 border border-gray-300 text-black bg-white mr-4">
            Play
          </button>
          <button className="px-5 py-2 border border-gray-300 text-white">
            Watch Later
          </button>
        </div>
        <p className="text-gray-400 text-sm my-1">
          Released: {mainMovie?.release_date}
        </p>
        <p className="text-gray-200 text- w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">
          {mainMovie?.overview}
        </p>
      </div>
    </div>
  );
};

export default Main;

import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard.js";

const Row = ({ title, fetchUrl }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    axios.get(fetchUrl).then((response) => {
      setMedias(response.data.results);
    });
  }, [fetchUrl]);

  return (
    <div className="container">
      <h1 className="text-white font-bold my-4">{title}</h1>
      <div className="relative flex items-center">
        <div
          id={"slider"}
          className="whitespace-nowrap scroll-smooth overflow-x-scroll no-scrollbar"
        >
          {medias?.map((item, id) => (
            <MovieCard
              item={item}
              key={id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Row;

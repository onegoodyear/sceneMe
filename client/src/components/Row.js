import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard.js";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ title, fetchUrl, rowId }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    axios.get(fetchUrl).then((response) => {
      setMedias(response.data.results);
    });
  }, [fetchUrl]);

  const slideLeft = () => {
    let slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    let slider = document.getElementById("slider" + rowId);
    slider.scrollRight = slider.scrollRight + 500;
  };

  return (
    <div className="container">
      <h1 className="text-white font-bold my-4">{title}</h1>
      <div className="relative flex items-center group">
        <MdChevronLeft
          size={40}
          className="bg-white rounded-full absolute left-0 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block z-10"
          onClick={slideLeft}
        />
        <div
          id={"slider" + rowId}
          className="whitespace-nowrap scroll-smooth overflow-x-scroll no-scrollbar"
        >
          {medias?.map((item, id) => (
            <MovieCard
              item={item}
              key={id}
            />
          ))}
        </div>
        <MdChevronRight
          size={40}
          className="bg-white rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block z-10"
          onClick={slideRight}
        />
      </div>
    </div>
  );
};

export default Row;

const MovieCard = ({ item }) => {
  return (
    <div className="w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px] cursor-pointer relative inline-block mr-4">
      <img
        src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
        alt={item?.title}
        loading="lazy"
        className="h-[200px] w-full object-cover" // Ensure image covers the card width
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white flex items-center justify-center">
        {" "}
        <p className="text-xs md:text-sm font-bold text-center">
          {" "}
          <span className="whitespace-normal">{item?.title}</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;

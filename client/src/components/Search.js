import { useState } from "react";
import { server_api } from "../Api";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchTerm}&include_adult=false`
      );
      const data = await res.json();
      console.log(data);
      const filteredResults = data.results.filter((movie) => !movie.adult);
      setSearchResults(filteredResults);
    } catch (err) {
      console.error(err);
    }
  };

  //   const handleAddMovieToList = async (listId, movie) => {
  //     try {
  //       const updatedList = await fetch(`${server_api}/lists/${listId}`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           title: movie.title,
  //           year: new Date(movie.release_date).getFullYear(),
  //           director: "N/A", // You can add a director fetching feature
  //           rating: movie.vote_average,
  //           poster: movie.poster_path,
  //           imdbID: movie.id,
  //         }),
  //       });
  //       const data = await updatedList.json();
  //       setLists((prevLists) =>
  //         prevLists.map((list) => (list._id === listId ? data : list))
  //       );
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  return (
    <>
      {/* Movie Search */}
      <div className="mb-6 relative w-[300px] sm:w-[420px]">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search for a movie..."
          className="bg-gray-700 p-3 pr-10 rounded w-full border-none outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-0"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M9.5 17A7.5 7.5 0 1 1 9.5 2a7.5 7.5 0 0 1 0 15z"
            />
          </svg>
        </button>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl mb-3">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResults.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 p-4 rounded cursor-pointer flex flex-col items-center"
                // onClick={() => handleAddMovieToList(lists[0]._id, movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded mb-2"
                />
                <h3 className="text-lg">{movie.title}</h3>
                <p>{new Date(movie.release_date).getFullYear()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;

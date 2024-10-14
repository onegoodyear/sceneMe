import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { server_api } from "../Api";
import Search from "../components/Search";

const Account = () => {
  const { user, logout } = useAuth();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user's lists
  useEffect(() => {
    const fetchLists = async () => {
      const token = localStorage.getItem("token");

      console.log(token);

      if (!token) return; // Exit if token is not ready

      setLoading(true); // Set loading state to true while fetching
      try {
        const res = await fetch(`${server_api}/lists`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setLists(data);
      } catch (err) {
        console.error(err);
        if (err.status === 401) {
          logout(); // Token expired or invalid
          navigate("/login");
        }
      } finally {
        setLoading(false); // Set loading state to false after fetch is complete
      }
    };

    if (user) {
      fetchLists(); // Fetch lists if user is authenticated
    }
  }, [user, logout, navigate]);

  // Handle add new list
  const handleAddList = () => {
    navigate("/list/new");
  };

  // Handle edit list
  const handleEditList = (listId) => {
    navigate(`/list/${listId}`);
  };

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 p-5">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold mb-5">My Lists</h1>
            {/* <Search /> */}

            <button
              onClick={handleAddList}
              className="bg-red-600 px-4 py-2 rounded mb-5"
            >
              Add New List
            </button>
          </div>

          {/* User Lists */}
          <div>
            {lists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(200px,_240px))] gap-4">
                {lists.map((list) => (
                  <div
                    key={list._id}
                    className="bg-gray-800 p-4 rounded cursor-pointer flex flex-col items-center"
                    onClick={() => handleEditList(list._id)} // Optionally allow clicking to edit
                  >
                    {list.items.length > 0 ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${list.items[0].poster}`}
                        alt={list.items[0].title}
                        className="rounded mb-2 h-[300px]"
                      />
                    ) : (
                      <div className="bg-gray-700 w-[200px] h-[300px] rounded mb-2 flex items-center justify-center">
                        <p className="text-sm">No Image Available</p>
                      </div>
                    )}

                    <h3 className="text-lg font-bold">{list.name}</h3>
                    {list.items.length > 0 && (
                      <p className="text-sm">
                        {list.items.length}{" "}
                        {list.items.length > 1 ? "items" : "item"}
                      </p>
                    )}
                    <button
                      onClick={() => handleEditList(list._id)}
                      className="bg-blue-600 px-4 py-2 rounded mt-2"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No lists created yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

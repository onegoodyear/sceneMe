import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { server_api } from "../Api";

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
          <h1 className="text-3xl font-bold mb-5">My Lists</h1>

          <button
            onClick={handleAddList}
            className="bg-red-600 px-4 py-2 rounded mb-5"
          >
            Add New List
          </button>

          {/* User Lists */}
          <div>
            {lists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lists.map((list) => (
                  <div
                    key={list._id}
                    className="bg-gray-800 p-4 rounded"
                  >
                    <h3 className="text-xl mb-2">{list.name}</h3>
                    <ul>
                      {list.items.map((item) => (
                        <li
                          key={item.tmdbID} // Changed to tmdbID to match your model
                          className="mb-1"
                        >
                          <span className="font-bold">{item.title}</span> (
                          {item.year}) - Rating: {item.rating}/10
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleEditList(list._id)}
                      className="bg-blue-600 px-4 py-2 rounded mt-2"
                    >
                      Edit List
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

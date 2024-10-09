import { useState, useEffect, useContext, createContext } from "react";
import { server_api } from "../Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  const login = (user, token) => {
    setUser(user);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const signup = (user, token) => {
    setUser(user);
    localStorage.setItem("token", token);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch(`${server_api}/users/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          console.log(data.user);
          if (data.user) {
            setUser(data.user);
          } else {
            localStorage.removeItem("token");
          }
        } catch (err) {
          console.log(err);
          localStorage.removeItem("token");
        }
      }
      setLoading(false); // Data has been fetched
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

import { useState, useEffect, useContext, createContext } from "react";
import { server_api } from "../Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user, token) => {
    setUser(user);
    localStorage.setItem("token", token);
  };

  const logout = (user, token) => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const signup = (user, token) => {
    setUser(user);
    localStorage.setItem("token", token);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${server_api}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setUser(data.user);
          else localStorage.removeItem("token");
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  return useContext(AuthContext);
}

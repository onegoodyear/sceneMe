import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { server_api } from "../Api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch(`${server_api}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            login(data.user, data.token);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen">
      <img
        className="absolute w-full h-screen hideen sm:block object-cover"
        src="/sign.jpg"
        alt="sign.jpg"
      ></img>
      <div className="absolute w-full h-screen hidden sm:block bg-black/60"></div>
      <div className="w-full fixed z-50 py-20">
        <div className="mx-auto max-w-[450px] h-[600px] bg-black/75 text-white">
          <div className="max-w-[350px] py-24 px-8 mx-auto">
            <h1 className="font-bold text-3xl my-4 pl-1">Sign In</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2"
            >
              <input
                type="text"
                placeholder="username"
                autoComplete="username"
                className="py-2 px-4 bg-gray-600 rounded my-2 h-12 appearance-none border-none focus:outline-none focus:ring-red-600 focus:ring-2"
              ></input>
              <input
                type="password"
                placeholder="Password"
                autoComplete="password"
                className="py-2 px-4 bg-gray-600 rounded my-2 h-12 appearance-none border-none focus:outline-none focus:ring-red-600 focus:ring-2"
              ></input>
              <button
                type="submit"
                className="bg-red-600 my-2 h-12 font-bold rounded"
              >
                Sign In
              </button>
            </form>
            <div className="flex justify-between items-center px-1 pt-6">
              <p className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-1"
                />
                Remember Me
              </p>
              <p className="text-gray-500">Need help?</p>
            </div>
            <div className="px-1 pt-6">
              <span className=" text-gray-500">New to SceneMe?</span>
              <Link
                to="/signup"
                className="font-bold ml-2"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

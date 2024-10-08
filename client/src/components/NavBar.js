import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between w-full container absolute z-[100] mt-4">
      <h1 className="text-red-600 text-2xl md:text-4xl font-bold cursor-pointer">
        SceneMe
      </h1>
      <div>
        <Link to="/login">
          <button className="text-white px-4">Sign in</button>
        </Link>
        <Link to="/signup">
          <button className="bg-red-600 px-6 py-2 text-white rounded">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

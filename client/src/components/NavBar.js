const NavBar = () => {
  return (
    <div className="flex items-center justify-between w-full container absolute z-[100]">
      <h1 className="text-red-600 text-2xl md:text-4xl font-bold cursor-pointer">
        SceneMe
      </h1>
      <div className="p-2">
        <button className="text-white px-4">Sign in</button>
        <button className="bg-red-600 px-6 py-2 text-white rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default NavBar;

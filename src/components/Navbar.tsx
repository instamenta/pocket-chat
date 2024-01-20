const Navbar = () => {
  return (
    <nav className="mb-3 border-b-cyan-700 bg-white p-4 drop-shadow-xl transition-all  hover:bg-slate-100">
      {/*border-b-4 hover:border-b-8*/}
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO/NAME PLACE HOLDER */}
        <div className="text-lg font-bold text-cyan-700 transition-transform hover:translate-x-4 hover:scale-125">
          Chatter
        </div>
        <div className="flex flex-row items-center space-x-4">
          {/* NAVBAR ITEMS */}

          <a href="#" className="text-gray-800 hover:text-black hover:underline">Home</a>
          <a href="/chat" className="text-gray-800 hover:text-black hover:underline">Chat</a>
          <a href="#" className="text-gray-800 hover:text-black hover:underline">Services</a>

          {/* AUTH ACTION BUTTON */}
          <div className="h-9 w-9 rounded-full bg-red-950  shadow-lg shadow-gray-400"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

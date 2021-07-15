const Header = (props) => {
  return (
    <div className="flex flex-col">
      <h1 className="bg-blue-400 text-white text-3xl p-4 text-center">
        Skynet Todo List
      </h1>
      <div className="bg-blue-300 p-1.5 items-center justify-end flex">
        {props.loggedIn !== null && !props.loggedIn && (
          <button
            className="text-white hover:bg-blue-500 hover:text-white p-2 rounded-full"
            onClick={props.handleLogin}
          >
            Login / SignUp
          </button>
        )}
        {props.loggedIn !== null && props.loggedIn && (
          <button
            className="text-white hover:bg-blue-500 hover:text-white p-2 rounded-full"
            onClick={props.handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  let userId = useSelector((state) => state.userId);

  let user = useSelector((state) => state.user);

  if (userId) {
    return (
      <div>
        <div className="mx-auto p-5">
          <h1 className="text-3xl my-8">
            Welcome to your account {user?.firstName} {user?.lastName}!
          </h1>

          <p className="">
            Visit /books and /companies route to see some of this this
            application's functionalities in action.
          </p>
        </div>

        <div className="mx-auto p-5">
          <Link to="/companies">
            <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg mr-3">
              Companies
            </button>
          </Link>
          <Link to="/books">
            <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg mr-3">
              Books
            </button>
          </Link>
        </div>

        <div className="mx-auto p-5">
          <Link to="/logout">
            <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg mr-3">
              Logout
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="mx-auto p-5">
          <h1 className="text-3xl my-8">Home</h1>

          <p className="">
            After registering an account and logging in, visit /books and
            /companies route to see some of this this application's
            functionalities in action.
          </p>
        </div>

        <div className="mx-auto p-5">
          <Link to="/login">
            <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg mr-3">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
              Register
            </button>
          </Link>
        </div>
      </div>
    );
  }
};

export default Home;

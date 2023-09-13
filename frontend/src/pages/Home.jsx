import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import verifyToken from "../utils/auth/verifyToken.jsx";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Home = () => {
  // Get userLoggedInId state from Redux store
  let userLoggedInId = useSelector((state) => state.userLoggedInId);

  // TODO: Why is useEffect() not re-rendering when state changes?
  useEffect(() => {
    console.log("userLoggedInId in Home.jsx: ", userLoggedInId);
  }, [userLoggedInId]);

  if (userLoggedInId) {
    return (
      <div>
        <div className="mx-auto p-5">
          <h1 className="text-3xl my-8">Welcome to your account!</h1>

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

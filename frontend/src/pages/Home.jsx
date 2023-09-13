import React from "react";
import { Link } from "react-router-dom";
import verifyToken from "../utils/auth/verifyToken.jsx";
import Cookies from "js-cookie";

const Home = () => {
  const token = Cookies.get("jwt");
  console.log("token in Home.jsx: ", token);
  verifyToken(token);

  return (
    <div>
      <div className="mx-auto p-5">
        <h1 className="text-3xl my-8">Home</h1>

        <p className="">
          Visit /books and /companies route to see some of this this
          application's functionalities in action.
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
};

export default Home;

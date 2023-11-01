import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/layout/Navbar";

const Home = () => {
  let userId = useSelector((state) => state.userId);
  let user = useSelector((state) => state.user);

  if (userId) {
    return (
      <div>
        <Navbar />
        <div className="mx-auto p-5">
          <h1 className="text-3xl my-2">
            Welcome to your account {user?.firstName} {user?.lastName}!
          </h1>
          <img
            src={user?.profilePicture}
            alt="profile picture"
            className="w-32 h-32 mt-2"
          />
          <p className="text-gray-500 text-sm">
            {user ? "@" + user?.username : ""}
          </p>
        </div>

        <div className="mx-auto p-5">
          <p className="">
            Visit Companies link to see some of this this application's features
            in action.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <div className="mx-auto p-5">
          <h1 className="text-3xl my-8">Home</h1>

          <p className="">
            Register and login to your account to see the features of this
            application in action. Account data will only be saved to your own
            MongoDB database and your password will be saved hashed by bcrypt.
          </p>
        </div>
      </div>
    );
  }
};

export default Home;

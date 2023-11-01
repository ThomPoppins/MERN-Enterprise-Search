import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/layout/Layout";

const Home = () => {
  let userId = useSelector((state) => state.userId);
  let user = useSelector((state) => state.user);

  if (userId) {
    return (
      <Layout>
        <div className="mx-auto p-5">
          <img
            src={user?.profilePicture}
            alt="profile picture"
            className="w-64 h-64 mt-2 rounded-full"
          />
          <h1 className="text-3xl my-2">
            Welcome {user?.firstName} {user?.lastName}!
          </h1>

          <p className="text-gray-500 text-sm">
            {user ? "@" + user?.username : ""}
          </p>
        </div>

        <div className="mx-auto p-5">
          <p className="">
            Visit the Companies link in the navigation bar to see some of this
            this application's features in action.
          </p>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="mx-auto p-5">
          <h1 className="text-3xl my-8">Home</h1>

          <p className="">
            Register and login to your account to see the features of this
            application in action. Account data will only be saved to your own
            MongoDB database and your password will be saved hashed by bcrypt.
          </p>
        </div>
      </Layout>
    );
  }
};

export default Home;

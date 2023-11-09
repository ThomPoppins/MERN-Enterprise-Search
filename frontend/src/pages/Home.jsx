import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../config";
import Layout from "../components/layout/Layout";

const Home = () => {
  let userId = useSelector((state) => state.userId);
  let user = useSelector((state) => state.user);

  if (userId) {
    return (
      <Layout>
        <div className="mx-auto p-5">
          <img
            src={
              user?.profilePictureURL
                ? user?.profilePictureURL
                : `${BACKEND_URL}/placeholders/profile-picture-male.jpg`
            }
            alt="profile picture"
            className="w-64 h-64 mt-2 rounded-full mx-auto object-cover"
          />

          <div className="mx-auto lg:w-9/12 border border-purple-900 bg-violet-950/40 rounded-xl p-4 mt-6">
            <h1 className="text-3xl my-2">
              Welcome {user?.firstName} {user?.lastName}
            </h1>

            <p className="text-blue-400 text-sm">
              {user ? "@" + user?.username : ""}
            </p>

            <div className="mx-auto mt-4 mb-3">
              <p className="">
                Visit the Companies link in the navigation bar to see some of
                this this application's features in action.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="mx-auto lg:w-9/12 border border-purple-900 bg-violet-950/40 rounded-xl p-4 mt-4">
          <h1 className="text-3xl mb-6">Home</h1>

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

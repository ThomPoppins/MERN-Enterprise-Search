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
          <div className="mx-auto min-h-[400px] lg:w-9/12 border border-purple-900 bg-violet-950/40 rounded-xl p-4 mt-6">
            <img
              src={`${BACKEND_URL}/logo/vind-expert.png`}
              alt="profile picture"
              className="w-64 h-64 mt-2 rounded-xl float-right object-cover"
            />
            <h1 className="text-6xl my-2">Vind-Expert</h1>

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

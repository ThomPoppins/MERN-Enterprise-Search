import React from "react";

const Home = () => {
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
        <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg mr-3">
          <a href="/login-user">Login</a>
        </button>
        <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
          <a href="/register-user">Register</a>
        </button>
      </div>
    </div>
  );
};

export default Home;

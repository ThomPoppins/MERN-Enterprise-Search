import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="outer-div min-h-screen">
        <Navbar />
        <div className="md:w-10/12 mx-auto">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;

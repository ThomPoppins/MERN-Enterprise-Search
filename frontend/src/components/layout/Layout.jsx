import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="outer-div min-h-screen">
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;

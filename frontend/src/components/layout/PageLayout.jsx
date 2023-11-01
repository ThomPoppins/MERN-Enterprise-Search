import React from "react";
import Navbar from "./Navbar";

const PageLayout = ({ children }) => {
  return (
    <div className="outer-div min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default PageLayout;

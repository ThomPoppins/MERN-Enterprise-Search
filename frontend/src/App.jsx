import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import BooksList from "./pages/books/BooksList";
import CreateBook from "./pages/books/CreateBook";
import EditBook from "./pages/books/EditBook";
import ShowBook from "./pages/books/ShowBook";
import DeleteBook from "./pages/books/DeleteBook";
import CompaniesList from "./pages/companies/CompaniesList";
import RegisterCompany from "./pages/companies/RegisterCompany";
import EditCompany from "./pages/companies/EditCompany";
import ShowCompany from "./pages/companies/ShowCompany";
import DeleteCompany from "./pages/companies/DeleteCompany";
import LoginUser from "./pages/users/LoginUser";
import RegisterUser from "./pages/users/RegisterUser";
import LogoutUser from "./pages/users/LogoutUser";
import Home from "./pages/Home";
import Cookies from "js-cookie";
import verifyToken from "./utils/auth/verifyToken.jsx";
import { useSelector } from "react-redux";

const App = () => {
  const token = Cookies.get("jwt");
  verifyToken(token);

  // Get userId state from Redux store
  const userId = useSelector((state) => state.userId);

  // TODO: [MERNSTACK-163] Redirect user from routes other then /, /login and /register if user is not logged in
  if (userId) {
    return (
      <Routes>
        {/* / route, render homepage*/}
        <Route path="/" element={<Home />} />
        {/* /login route, render user login page */}
        <Route path="/login" element={<LoginUser />} />
        {/* /register route, render user register page */}
        <Route path="/register" element={<RegisterUser />} />
        {/* /logout route, render user logout page */}
        <Route path="/logout" element={<LogoutUser />} />
        {/* /companies/* routes */}
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/companies/register" element={<RegisterCompany />} />
        <Route path="/companies/edit/:id" element={<EditCompany />} />
        <Route path="/companies/details/:id" element={<ShowCompany />} />
        <Route path="/companies/delete/:id" element={<DeleteCompany />} />
        {/* /books/* routes */}
        <Route path="/books" element={<BooksList />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        {/* / route, render homepage*/}
        <Route path="/" element={<Home />} />
        {/* /login route, render user login page */}
        <Route path="/login" element={<LoginUser />} />
        {/* /register route, render user register page */}
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
    );
  }
};

export default App;

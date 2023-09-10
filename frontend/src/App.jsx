import React from "react";
import { Routes, Route } from "react-router-dom";
import BooksList from "./pages/books/BooksList";
import CreateBook from "./pages/books/CreateBook";
import EditBook from "./pages/books/EditBook";
import ShowBook from "./pages/books/ShowBook";
import DeleteBook from "./pages/books/DeleteBook";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<BooksList />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
};

export default App;

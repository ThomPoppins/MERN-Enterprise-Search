import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeBooks from "./pages/books/HomeBooks";
import CreateBook from "./pages/books/CreateBook";
import EditBook from "./pages/books/EditBook";
import ShowBook from "./pages/books/ShowBook";
import DeleteBook from "./pages/books/DeleteBook";

const App = () => {
  return (
    <Routes>
      <Route path="/books" element={<HomeBooks />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/edit" element={<EditBook />} />
      <Route path="/books/show" element={<ShowBook />} />
      <Route path="/books/delete" element={<DeleteBook />} />
    </Routes>
  );
};

export default App;

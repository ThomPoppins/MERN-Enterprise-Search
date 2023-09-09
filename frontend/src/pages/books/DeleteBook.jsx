import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../config.js";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // useNavigate is a hook that allows us to navigate to a different page
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(BACKEND_URL + `/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/books");
      })
      .catch((error) => {
        setLoading(false);
        alert("Error deleting book, please check the console.");
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton destination={"/books"} />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, delete it!
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;

import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../config.js";
import { useSnackbar } from "notistack";

const DeleteCompany = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // useNavigate is a hook that allows us to navigate to a different page
  const navigate = useNavigate();

  // useSnackbar is a hook that returns an object with two properties: enqueueSnackbar and closeSnackbar
  // enqueueSnackbar is a function that takes an object as an argument
  // and displays a snackbar with the message and the variant that we pass in the object
  // closeSnackbar is a function that takes an id as an argument and closes the snackbar with that id
  // https://iamhosseindhv.com/notistack/demos#use-snackbar
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteCompany = () => {
    setLoading(true);
    axios
      .delete(BACKEND_URL + `/companies/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Company deleted successfully!", {
          variant: "success",
        });
        navigate("/companies");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting company!", { variant: "error" });
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton destination={"/companies"} />
      <h1 className="text-3xl my-4">Delete Company</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are you sure you want to delete this company?
        </h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteCompany}
        >
          Yes, delete it!
        </button>
      </div>
    </div>
  );
};

export default DeleteCompany;

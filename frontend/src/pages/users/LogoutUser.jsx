import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../config.js";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import store from "../../store/store.jsx";
import { USER_ID } from "../../store/actions.jsx";
import Navbar from "../../components/layout/Navbar";
import Layout from "../../components/layout/Layout";

const LogoutUser = () => {
  // Loading state for displaying a spinner while the request is being sent to the backend
  const [loading, setLoading] = useState(false);

  // useNavigate is a hook that allows us to navigate to a different page
  const navigate = useNavigate();

  // useSnackbar is a hook that returns an object with two properties: enqueueSnackbar and closeSnackbar
  // enqueueSnackbar is a function that takes an object as an argument
  // and displays a snackbar with the message and the variant that we pass in the object
  // closeSnackbar is a function that takes an id as an argument and closes the snackbar with that id
  // https://iamhosseindhv.com/notistack/demos#use-snackbar
  const { enqueueSnackbar } = useSnackbar();

  const handleLogoutUser = () => {
    setLoading(true);
    Cookies.remove("jwt");
    store.dispatch({
      type: USER_ID,
      payload: null,
    });
    store.dispatch({
      type: "USER",
      payload: null,
    });
    store.dispatch({
      type: "COMPANIES_LIST_SHOW_TYPE",
      payload: "card",
    });
    setLoading(false);
    navigate("/");
  };
  return (
    <Layout>
      <div className="p-4">
        <BackButton destination={"/"} />
        <h1 className="text-3xl my-4">Log out</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl">Are you sure you want to log out?</h3>
          <button
            className="p-4 bg-red-600 text-white m-8 w-full"
            onClick={handleLogoutUser}
          >
            Yes, please!
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default LogoutUser;

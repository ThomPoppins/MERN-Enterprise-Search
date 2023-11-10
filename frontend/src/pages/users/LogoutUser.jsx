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

  // useSnackbar is a hook that allows us to show a snackbar https://www.npmjs.com/package/notistack https://iamhosseindhv.com/notistack/demos#use-snackbar
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
      <div className="flex flex-col justify-center h-screen">
        {loading ? <Spinner /> : ""}
        <div className="md:w-[600px] mx-auto h-[190px] border border-purple-900 bg-violet-950/40 rounded-xl p-4 mt-16">
          <div className="flex justify-center pt-4">
            <h3 className="text-2xl">Are you sure you want to log out?</h3>
          </div>
          <div className="flex justify-center">
            <button
              className="w-3/4 bg-gradient-to-r from-red-500 to-red-600 hover:bg-purple-700 hover:bg-gradient-to-l rounded-lg p-2 m-8"
              onClick={handleLogoutUser}
              data-test-id="logout-user-button"
            >
              Yes, please!
            </button>
          </div>
        </div>
        <div className="my-32"></div>
      </div>
    </Layout>
  );
};

export default LogoutUser;

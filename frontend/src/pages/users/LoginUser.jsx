import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../config.js";
import { useSnackbar } from "notistack";
import emailValidator from "../../validation/emailValidator";

const RegisterUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // useSnackbar is a hook that returns an object with two properties: enqueueSnackbar and closeSnackbar
  // enqueueSnackbar is a function that takes an object as an argument
  // and displays a snackbar with the message and the variant that we pass in the object
  // closeSnackbar is a function that takes an id as an argument and closes the snackbar with that id
  // https://iamhosseindhv.com/notistack/demos#use-snackbar
  const { enqueueSnackbar } = useSnackbar();

  let invalidValues = false;

  const handleLoginUser = () => {
    // TODO: [MERNSTACK-157] Give input field of the form a red border if the input is invalid
    // TODO: [MERNSTACK-158] Display error message under the input field if the input is invalid explaining the right format
    // Validate email address to be the correct format
    if (emailValidator(email) === false) {
      enqueueSnackbar("Invalid email address!", { variant: "error" });
      console.log("Invalid email" + email);
      invalidValues = true;
    }
    if (invalidValues) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    setLoading(true);

    axios
      .post(BACKEND_URL + "/users/login", data)
      .then((response) => {
        setLoading(false);
        // Save the JWT token in a cookie
        const token = response.data.token;
        console.log("JWT token in LoginUser.jsx: " + token);
        // Cookie expires one day before the JWT token expires this is to avoid
        // the case where the JWT token expires before the cookie and the user is
        // logged out before the cookie expires.
        Cookies.set("jwt", token, { expires: 29 });
        enqueueSnackbar("You are logged in!", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error logging in!", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination={"/"} />
      <h1 className="text-3xl my-4">Login</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleLoginUser}>
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisterUser;

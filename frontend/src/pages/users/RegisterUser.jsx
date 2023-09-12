import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../config.js";
import { useSnackbar } from "notistack";
import emailValidator from "../../validation/emailValidator";
import usernameValidator from "../../validation/usernameValidator";
import passwordValidator from "../../validation/passwordValidator";
import firstNameValidator from "../../validation/firstNameValidator";
import lastNameValidator from "../../validation/lastNameValidator";

const RegisterUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // useSnackbar is a hook that returns an object with two properties: enqueueSnackbar and closeSnackbar
  // enqueueSnackbar is a function that takes an object as an argument
  // and displays a snackbar with the message and the variant that we pass in the object
  // closeSnackbar is a function that takes an id as an argument and closes the snackbar with that id
  // https://iamhosseindhv.com/notistack/demos#use-snackbar
  const { enqueueSnackbar } = useSnackbar();

  let invalidValues = false;

  const handleSaveUser = () => {
    // TODO: [MERNSTACK-157] Give input field of the form a red border if the input is invalid
    // TODO: [MERNSTACK-158] Display error message under the input field if the input is invalid explaining the right format
    // Validate email address to be the correct format
    if (emailValidator(email) === false) {
      enqueueSnackbar("Invalid email address!", { variant: "error" });
      console.log("Invalid email" + email);
      invalidValues = true;
    }
    // Validate username to be alphanumeric and at least 1 character long
    if (usernameValidator(username) === false) {
      enqueueSnackbar(
        "Invalid username! Username has to be alphanumeric and at least 1 character long.",
        { variant: "error" }
      );
      console.log("Invalid username" + username);
      invalidValues = true;
    }
    // Validate password to be a safe password
    if (passwordValidator(password) === false) {
      enqueueSnackbar(
        "Invalid password! Password has to be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit and one special character.",
        { variant: "error" }
      );
      console.log("Invalid password" + password);
      invalidValues = true;
    }
    // Validate first name and last name to be at least 1 character long and not contain any numbers. Names can contain dots and white spaces.
    if (firstNameValidator(firstName) === false) {
      enqueueSnackbar(
        "Invalid first name! First name has to be at least 1 character long and not contain any numbers. Names can contain dots and white spaces.",
        { variant: "error" }
      );
      console.log("Invalid first name" + firstName);
      invalidValues = true;
    }
    // Validate last name to be at least 1 character long and not contain any numbers. Names can contain white spaces.
    if (lastNameValidator(lastName) === false) {
      enqueueSnackbar(
        "Invalid last name! Last name has to be at least 1 character long and not contain any numbers. Last name can contain white spaces.",
        { variant: "error" }
      );
      console.log("Invalid last name" + lastName);
      invalidValues = true;
    }

    if (invalidValues) {
      return;
    }

    const data = {
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    setLoading(true);
    axios
      .post(BACKEND_URL + "/users", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("User account registered successfully!", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error registering account!", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination={"/"} />
      <h1 className="text-3xl my-4">Register Account</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
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
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveUser}>
          Save
        </button>
      </div>
    </div>
  );
};

export default RegisterUser;

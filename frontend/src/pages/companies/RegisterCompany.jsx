import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../config.js";
import { useSnackbar } from "notistack";
import companyNameValidator from "../../validation/companyNameValidator";
import phoneNumberValidator from "../../validation/phoneNumberValidator";
import emailValidator from "../../validation/emailValidator";
import startYearValidator from "../../validation/startYearValidator";
import { useSelector } from "react-redux";

const RegisterCompany = () => {
  // TODO: [MERNSTACK-127] Add state for all companies fields that can be registered
  // Input field values for registering a company as state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [startYear, setStartYear] = useState("");

  // Error state for displaying error messages if the user enters invalid input
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [startYearError, setStartYearError] = useState(false);

  // Loading state for displaying a spinner while the request is being sent to the backend
  const [loading, setLoading] = useState(false);

  // Get the userId from the Redux store
  const userId = useSelector((state) => state.userId);

  // useNavigate is a hook that returns a navigate function that we can use to navigate to a different page
  const navigate = useNavigate();

  // useSnackbar is a hook that returns an object with two properties: enqueueSnackbar and closeSnackbar
  // enqueueSnackbar is a function that takes an object as an argument
  // and displays a snackbar with the message and the variant that we pass in the object
  // closeSnackbar is a function that takes an id as an argument and closes the snackbar with that id
  // https://iamhosseindhv.com/notistack/demos#use-snackbar
  const { enqueueSnackbar } = useSnackbar();

  // TODO: [MERNSTACK-159] Give input field of the form a red border if the input is invalid
  // TODO: [MERNSTACK-160] Display error message under the input field if the input is invalid explaining the right format

  // Validate user input fields
  const validateCompanyName = () => {
    if (companyNameValidator(name) === false) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };
  const validateEmail = () => {
    if (emailValidator(email) === false) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const validatePhone = () => {
    if (phoneNumberValidator(phone, "NL") === false) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };
  const validateStartYear = () => {
    if (startYearValidator(startYear) === false) {
      setStartYearError(true);
    } else {
      setStartYearError(false);
    }
  };

  // Handle onChange events for all input fields
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (nameError) {
      validateCompanyName();
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail();
    }
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (phoneError) {
      validatePhone();
    }
  };
  const handleStartYearChange = (e) => {
    setStartYear(e.target.value);
    if (startYearError) {
      validateStartYear();
    }
  };

  // Display error messages if the user enters invalid input
  useEffect(() => {
    if (nameError) {
      enqueueSnackbar("Company name is invalid!", { variant: "error" });
    }
    if (emailError) {
      enqueueSnackbar("Email is invalid!", { variant: "error" });
    }
    if (phoneError) {
      enqueueSnackbar("Phone number is invalid!", { variant: "error" });
    }
    if (startYearError) {
      enqueueSnackbar("Start year is invalid!", { variant: "error" });
    }
  }, [nameError, emailError, phoneError, startYearError]);

  const handleSaveCompany = () => {
    // Validate all fields before sending the request to the backend, otherwise return
    validateCompanyName();
    validateEmail();
    validatePhone();
    validateStartYear();
    if (nameError || emailError || phoneError || startYearError) {
      enqueueSnackbar(
        "Please fill in all fields correctly before saving this company!",
        { variant: "error" }
      );
      return;
    }

    // TODO: [MERNSTACK-167] Add KVK number to the form
    // TODO: [MERNSTACK-166] Validate validity and uniqueness of company KVK number

    const data = {
      // TODO: [MERNSTACK-132] Add all companies fields that can be registered
      name: name,
      email: email,
      phone: phone,
      startYear: startYear,
      owners: [{ userId: userId }], // Make sure that the user that registers the company is added as an owner
    };
    setLoading(true);
    axios
      .post(BACKEND_URL + "/companies", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Company registered successfully!", {
          variant: "success",
        });
        navigate("/companies");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error registering company!", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination={"/companies"} />
      <h1 className="text-3xl my-4">Register Company</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {/* // TODO: [MERNSTACK-128] RegisterCompany.jsx: Add form inputs of all fields that the owner should fill in to register a company. Copy paste the following outer div with .my-4 class to achieve this*/}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            // onChange is a function that takes an event as an argument
            // and sets the name state to the value of the input
            // e.target.value is the value of the input
            onChange={handleNameChange}
            onBlur={validateCompanyName}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              nameError ? "border-red-500" : ""
            }`}
          />
          {nameError ? (
            <p className="text-red-500 text-sm">
              Company name must be between 1 and 60 characters long and can only
              contain letters, numbers, spaces, and the following characters: -,
              ', and .
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="text"
            value={email}
            // onChange is a function that takes an event as an argument
            // and sets the name state to the value of the input
            // e.target.value is the value of the input
            onChange={handleEmailChange}
            onBlur={validateEmail}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              emailError ? "border-red-500" : ""
            }`}
          />
          {emailError ? (
            <p className="text-red-500 text-sm">
              Email must be a valid email address.
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Phone</label>
          <input
            type="text"
            value={phone}
            // onChange is a function that takes an event as an argument
            // and sets the name state to the value of the input
            // e.target.value is the value of the input
            onChange={handlePhoneChange}
            onBlur={validatePhone}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              phoneError ? "border-red-500" : ""
            }`}
          />
        </div>
        {phoneError ? (
          <p className="text-red-500 text-sm">
            Phone number must be a valid phone number.
          </p>
        ) : (
          ""
        )}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Start Year</label>
          <input
            type="number"
            value={startYear}
            // onChange is a function that takes an event as an argument
            // and sets the name state to the value of the input
            // e.target.value is the value of the input
            onChange={handleStartYearChange}
            onBlur={validateStartYear}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              startYearError ? "border-red-500" : ""
            }`}
          />
          {startYearError ? (
            <p className="text-red-500 text-sm">
              Start year must be a valid year and never can be later then the
              current year. If company hasn't started yet, register company when
              it starts.
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg mx-auto w-1/2"
          onClick={handleSaveCompany}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default RegisterCompany;

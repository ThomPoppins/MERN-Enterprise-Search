import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL, TEST_KVK_API } from "../../../config.js";
import { useSnackbar } from "notistack";
import companyNameValidator from "../../utils/validation/companyNameValidator";
import emailValidator from "../../utils/validation/emailValidator";
import phoneNumberValidator from "../../utils/validation/phoneNumberValidator";
import kvkNumberValidator from "../../utils/validation/kvkNumberValidator";
import companySloganValidator from "../../utils/validation/companySloganValidator";
import startYearValidator from "../../utils/validation/startYearValidator";
import { useSelector } from "react-redux";

const RegisterCompany = () => {
  // TODO: [MERNSTACK-127] Add state for all companies fields that can be registered
  // Input field values for registering a company as state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [kvkNumber, setKvkNumber] = useState("");
  const [slogan, setSlogan] = useState("");
  const [startYear, setStartYear] = useState("");

  // Error state for displaying error messages if the user enters invalid input
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [kvkNumberError, setKvkNumberError] = useState(false);
  const [sloganError, setSloganError] = useState(false);
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

  // Validate user input fields
  const validateCompanyName = () => {
    if (!companyNameValidator(name)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };
  const validateEmail = () => {
    if (!emailValidator(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const validatePhone = () => {
    if (!phoneNumberValidator(phone, "NL")) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };
  const validateKvkNumber = async () => {
    if (!(await kvkNumberValidator(kvkNumber))) {
      setKvkNumberError(true);
    } else {
      setKvkNumberError(false);
    }
  };
  const validateSlogan = () => {
    if (!companySloganValidator(slogan)) {
      setSloganError(true);
    } else {
      setSloganError(false);
    }
  };
  const validateStartYear = () => {
    if (!startYearValidator(startYear)) {
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
  const handleKvkNumberChange = async (e) => {
    setKvkNumber(e.target.value);
    if (kvkNumberError) {
      await validateKvkNumber();
    }
  };
  const handleSloganChange = (e) => {
    setSlogan(e.target.value);
    if (sloganError) {
      validateSlogan();
    }
  };
  const handleStartYearChange = (e) => {
    setStartYear(e.target.value);
    if (startYearError) {
      validateStartYear();
    }
  };

  // Display error messages if the user enters invalid input with useSnackbar
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
    if (kvkNumberError) {
      enqueueSnackbar("KVK number is invalid!", { variant: "error" });
    }
    if (sloganError) {
      enqueueSnackbar("Slogan is invalid!", { variant: "error" });
    }
    if (startYearError) {
      enqueueSnackbar("Start year is invalid!", { variant: "error" });
    }
  }, [
    nameError,
    emailError,
    phoneError,
    kvkNumberError,
    sloganError,
    startYearError,
  ]);

  const handleSaveCompany = async () => {
    // Validate all fields before sending the request to the backend, otherwise return
    validateCompanyName();
    validateEmail();
    validatePhone();
    await validateKvkNumber();
    validateSlogan();
    validateStartYear();
    // TODO: [MERNSTACK-193] Fix BUG that you can save a company without kvk number validation in RegisterCompany.jsx and EditCompany.jsx
    if (
      nameError ||
      emailError ||
      phoneError ||
      kvkNumberError ||
      sloganError ||
      startYearError ||
      !name ||
      !email ||
      !phone ||
      !kvkNumber ||
      !slogan ||
      !startYear
    ) {
      enqueueSnackbar(
        "Please fill in all fields correctly before saving this company!",
        { variant: "error" }
      );
      return;
    }

    // TODO: [MERNSTACK-166] Validate validity and uniqueness of company KVK number

    const data = {
      // TODO: [MERNSTACK-132] Add all companies fields that can be registered
      name: name,
      email: email,
      phone: phone,
      kvkNumber: kvkNumber,
      slogan: slogan,
      startYear: startYear,
      slogan: slogan,
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
          <label className="text-xl mr-4 text-gray-500">KVK Number</label>
          {TEST_KVK_API ? (
            <div className="mb-4">
              <p className="text-gray-400">
                <strong>Note:</strong> Use KVK numbers from{" "}
                <a
                  className="text-blue-600"
                  href="https://developers.kvk.nl/documentation/testing"
                >
                  this page
                </a>
              </p>
            </div>
          ) : (
            ""
          )}
          <input
            type="text"
            value={kvkNumber}
            // onChange is a function that takes an event as an argument
            // and sets the name state to the value of the input
            // e.target.value is the value of the input
            onChange={handleKvkNumberChange}
            onBlur={validateKvkNumber}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              kvkNumberError ? "border-red-500" : ""
            }`}
          />
          {kvkNumberError ? (
            <p className="text-red-500 text-sm">
              KVK number must be a valid KVK number.
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Slogan</label>
          <input
            type="text"
            value={slogan}
            // onChange is a function that takes an event as an argument
            // and sets the name state to the value of the input
            // e.target.value is the value of the input
            onChange={handleSloganChange}
            onBlur={validateSlogan}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              startYearError ? "border-red-500" : ""
            }`}
          />
          {sloganError ? (
            <p className="text-red-500 text-sm">
              This should be the motto of your company. It must be at least 1
              character long.
            </p>
          ) : (
            ""
          )}
        </div>
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

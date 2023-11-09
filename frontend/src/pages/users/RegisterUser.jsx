import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../config.js";
import { useSnackbar } from "notistack";
import emailValidator from "../../utils/validation/emailValidator";
import usernameValidator from "../../utils/validation/usernameValidator";
import passwordValidator from "../../utils/validation/passwordValidator";
import firstNameValidator from "../../utils/validation/firstNameValidator";
import lastNameValidator from "../../utils/validation/lastNameValidator";
import genderValidator from "../../utils/validation/genderValidator";
import Navbar from "../../components/layout/Navbar";
import Layout from "../../components/layout/Layout";

const RegisterUser = () => {
  // Form input fields as state variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  // Error message returned by the server when registering a user fails
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  // Error state variables for displaying error messages if the user input is invalid
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [genderError, setGenderError] = useState(false);

  // Loading state variable for displaying the spinner
  const [loading, setLoading] = useState(false);

  // useNavigate is a hook that returns a navigate function that we can use to navigate to a different page
  const navigate = useNavigate();

  // useSnackbar is a hook that returns an object with two properties: enqueueSnackbar and closeSnackbar
  // enqueueSnackbar is a function that takes an object as an argument
  // and displays a snackbar with the message and the variant that we pass in the object
  // closeSnackbar is a function that takes an id as an argument and closes the snackbar with that id
  // https://iamhosseindhv.com/notistack/demos#use-snackbar
  const { enqueueSnackbar } = useSnackbar();

  // Validate user input fields
  const validateUsername = () => {
    if (usernameValidator(username) === false) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };
  const validateEmail = () => {
    if (emailValidator(email) === false) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const validatePassword = () => {
    if (passwordValidator(password) === false) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  };
  const validateFirstName = () => {
    if (firstNameValidator(firstName) === false) {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
  };
  const validateLastName = () => {
    if (lastNameValidator(lastName) === false) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
  };
  const validateGender = () => {
    if (genderValidator(gender) === false) {
      setGenderError(true);
    } else {
      setGenderError(false);
    }
  };

  // Handle onChange events for all input fields
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (usernameError) {
      validateUsername();
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail();
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) {
      validatePassword();
    }
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) {
      validateConfirmPassword();
    }
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (firstNameError) {
      validateFirstName();
    }
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (lastNameError) {
      validateLastName();
    }
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
    if (genderError) {
      validateGender();
    }
  };

  // Display error messages if the user enters invalid input with useSnackbar
  useEffect(() => {
    if (usernameError) {
      enqueueSnackbar(
        "Username is invalid! Username has to be alphanumeric and at least 1 character long.",
        { variant: "error" }
      );
    }
    if (emailError) {
      enqueueSnackbar("Email address is invalid!", { variant: "error" });
    }
    if (passwordError) {
      enqueueSnackbar(
        "Password is invalid! Password has to be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit and one special character.",
        { variant: "error" }
      );
    }
    if (confirmPasswordError) {
      enqueueSnackbar("Passwords do not match!", { variant: "error" });
    }
    if (firstNameError) {
      enqueueSnackbar(
        "First name is invalid! First name has to be at least 1 character long and not contain any numbers. Names can contain dots and white spaces.",
        { variant: "error" }
      );
    }
    if (lastNameError) {
      enqueueSnackbar(
        "Last name is invalid! Last name has to be at least 1 character long and not contain any numbers. Last name can contain white spaces.",
        { variant: "error" }
      );
    }
    if (genderError) {
      enqueueSnackbar("Gender is a required field.", { variant: "error" });
    }
  }, [
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,
    firstNameError,
    lastNameError,
    genderError,
  ]);

  // Handle saving the user to the database
  const handleSaveUser = () => {
    // TODO:

    // Validate all fields before sending the request to the backend, otherwise return
    validateUsername();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateFirstName();
    validateLastName();
    validateGender();
    if (
      usernameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      firstNameError ||
      lastNameError ||
      genderError ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !gender
    ) {
      return;
    }

    // User data object to send to the backend
    const data = {
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
    };

    // Display the spinner
    setLoading(true);

    // Send a POST request to the backend to save the user to the database
    axios
      .post(BACKEND_URL + "/users", data)
      .then(() => {
        // Hide the spinner
        setLoading(false);
        // Display a success message
        enqueueSnackbar("User account registered successfully!", {
          variant: "success",
        });
        // Navigate to the home page
        navigate("/");
      })
      .catch((error) => {
        // Hide the spinner
        setLoading(false);
        // Display an error message
        setRegisterErrorMessage(error.response.data.message);
        // Display an error message
        enqueueSnackbar("Error registering account!", { variant: "error" });
        // Log the error to the console
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="flex justify-center text-3xl my-4 mb-6">Register</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col border-2 border-purple-900 bg-violet-950/40 rounded-xl w-[600px] py-4 px-8 mx-auto">
          {registerErrorMessage ? (
            <p className="text-red-500 text-sm">{registerErrorMessage}</p>
          ) : (
            ""
          )}
          <div className="my-4">
            <label className="text-xl mr-4">Username</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              onBlur={validateUsername}
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                usernameError ? "border-red-500" : ""
              }`}
            />
            {usernameError ? (
              <p className="text-red-500 text-sm">
                Username must be at least 1 alphanumeric character long.
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="my-4">
            <label className="text-xl mr-4">Email</label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              onBlur={validateEmail}
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
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
            <label className="text-xl mr-4">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={validatePassword}
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                passwordError ? "border-red-500" : ""
              }`}
            />
            {passwordError ? (
              <p className="text-red-500 text-sm">
                Password must be at least 8 characters long, contain at least
                one uppercase letter, one lowercase letter, one digit and one
                special character.
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="my-4">
            <label className="text-xl mr-4">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={validateConfirmPassword}
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                confirmPasswordError ? "border-red-500" : ""
              }`}
            />
            {confirmPasswordError ? (
              <p className="text-red-500 text-sm">
                Confirm password does not match password.
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="my-4">
            <label className="text-xl mr-4">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              onBlur={validateFirstName}
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                firstNameError ? "border-red-500" : ""
              }`}
            />
            {firstNameError ? (
              <p className="text-red-500 text-sm">
                First name must be between at least 1 character long and can
                only contain letters, dots, and spaces.
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 ">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              onBlur={validateLastName}
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                lastNameError ? "border-red-500" : ""
              }`}
            />
            {lastNameError ? (
              <p className="text-red-500 text-sm">
                Last name must be between at least 1 character long and can only
                contain letters and spaces.
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="my-4">
            <label className="text-xl mr-4">Gender</label> <br />
            <div className="flex flex-row justify-center space-x-16">
              <input
                type="radio"
                name="gender"
                value="Man"
                onChange={handleGenderChange}
              />{" "}
              Man
              <input
                type="radio"
                name="gender"
                value="Woman"
                onChange={handleGenderChange}
              />{" "}
              Woman
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={handleGenderChange}
              />{" "}
              Other
            </div>
            {genderError ? (
              <p className="text-red-500 text-sm">
                Gender is a required field.
              </p>
            ) : (
              ""
            )}
            <br />
          </div>
          <button
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l rounded-lg p-2 m-8"
            onClick={handleSaveUser}
          >
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterUser;

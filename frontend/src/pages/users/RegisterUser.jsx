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

const RegisterUser = () => {
  // Form input fields as state variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Error message returned by the server when registering a user fails
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  // Error state variables for displaying error messages if the user input is invalid
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

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
  }, [
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,
    firstNameError,
    lastNameError,
  ]);

  // Handle saving the user to the database
  const handleSaveUser = () => {
    // TODO: [MERNSTACK-157] Give input field of the form a red border if the input is invalid
    // TODO: [MERNSTACK-158] Display error message under the input field if the input is invalid explaining the right format

    // Validate all fields before sending the request to the backend, otherwise return
    validateUsername();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateFirstName();
    validateLastName();
    if (
      usernameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      firstNameError ||
      lastNameError ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName
    ) {
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
        setRegisterErrorMessage(error.response.data.message);
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
        {registerErrorMessage ? (
          <p className="text-red-500 text-sm">{registerErrorMessage}</p>
        ) : (
          ""
        )}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Username</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            onBlur={validateUsername}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
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
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="text"
            value={email}
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
          <label className="text-xl mr-4 text-gray-500">Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={validatePassword}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              passwordError ? "border-red-500" : ""
            }`}
          />
          {passwordError ? (
            <p className="text-red-500 text-sm">
              Password must be at least 8 characters long, contain at least one
              uppercase letter, one lowercase letter, one digit and one special
              character.
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={validateConfirmPassword}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
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
          <label className="text-xl mr-4 text-gray-500">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            onBlur={validateFirstName}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              firstNameError ? "border-red-500" : ""
            }`}
          />
          {firstNameError ? (
            <p className="text-red-500 text-sm">
              First name must be between at least 1 character long and can only
              contain letters, dots, and spaces.
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            onBlur={validateLastName}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
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
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveUser}>
          Save
        </button>
      </div>
    </div>
  );
};

export default RegisterUser;

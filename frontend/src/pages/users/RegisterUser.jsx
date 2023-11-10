import axios from "axios";
import { BACKEND_URL } from "../../../config.js";
import emailValidator from "../../utils/validation/emailValidator";
import firstNameValidator from "../../utils/validation/firstNameValidator";
import genderValidator from "../../utils/validation/genderValidator";
import lastNameValidator from "../../utils/validation/lastNameValidator";
import Layout from "../../components/layout/Layout";
import passwordValidator from "../../utils/validation/passwordValidator";
import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import usernameValidator from "../../utils/validation/usernameValidator";

const RegisterUser = () => {
  // Form input fields as state variables
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState(""),
    [firstName, setFirstName] = useState(""),
    [lastName, setLastName] = useState(""),
    [gender, setGender] = useState(""),
    // Error message returned by the server when registering a user fails
    [registerErrorMessage, setRegisterErrorMessage] = useState(""),
    // Error state variables for displaying error messages if the user input is invalid
    [usernameError, setUsernameError] = useState(false),
    [emailError, setEmailError] = useState(false),
    [passwordError, setPasswordError] = useState(false),
    [confirmPasswordError, setConfirmPasswordError] = useState(false),
    [firstNameError, setFirstNameError] = useState(false),
    [lastNameError, setLastNameError] = useState(false),
    [genderError, setGenderError] = useState(false),
    // Loading state variable for displaying the spinner
    [loading, setLoading] = useState(false),
    // useNavigate is a hook that returns a navigate function that we can use to navigate to a different page
    navigate = useNavigate(),
    // useSnackbar is a hook that allows us to show a snackbar https://www.npmjs.com/package/notistack https://iamhosseindhv.com/notistack/demos#use-snackbar
    { enqueueSnackbar } = useSnackbar(),
    // Validate user input fields
    validateUsername = () => {
      if (usernameValidator(username) === false) {
        setUsernameError(true);
      } else {
        setUsernameError(false);
      }
    },
    validateEmail = () => {
      if (emailValidator(email) === false) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    },
    validatePassword = () => {
      if (passwordValidator(password) === false) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    },
    validateConfirmPassword = () => {
      if (password === confirmPassword) {
        setConfirmPasswordError(false);
        return;
      }
      setConfirmPasswordError(true);
    },
    validateFirstName = () => {
      if (firstNameValidator(firstName) === false) {
        setFirstNameError(true);
      } else {
        setFirstNameError(false);
      }
    },
    validateLastName = () => {
      if (lastNameValidator(lastName) === false) {
        setLastNameError(true);
      } else {
        setLastNameError(false);
      }
    },
    validateGender = () => {
      if (genderValidator(gender) === false) {
        setGenderError(true);
      } else {
        setGenderError(false);
      }
    },
    // Handle onChange events for all input fields
    handleUsernameChange = (event) => {
      setUsername(event.target.value);
      if (usernameError) {
        validateUsername();
      }
    },
    handleEmailChange = (event) => {
      setEmail(event.target.value);
      if (emailError) {
        validateEmail();
      }
    },
    handlePasswordChange = (event) => {
      setPassword(event.target.value);
      if (passwordError) {
        validatePassword();
      }
    },
    handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
      if (confirmPasswordError) {
        validateConfirmPassword();
      }
    },
    handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
      if (firstNameError) {
        validateFirstName();
      }
    },
    handleLastNameChange = (event) => {
      setLastName(event.target.value);
      if (lastNameError) {
        validateLastName();
      }
    },
    handleGenderChange = (event) => {
      setGender(event.target.value);
      if (genderError) {
        validateGender();
      }
    };

  // Display error messages if the user enters invalid input with useSnackbar
  useEffect(() => {
    if (usernameError) {
      enqueueSnackbar(
        "Username is invalid! Username has to be alphanumeric and at least 1 character long.",
        { variant: "error", preventDuplicate: true }
      );
    }
    if (emailError) {
      enqueueSnackbar("Email address is invalid!", { variant: "error" });
    }
    if (passwordError) {
      enqueueSnackbar(
        "Password is invalid! Password has to be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit and one special character.",
        { variant: "error", preventDuplicate: true }
      );
    }
    if (confirmPasswordError) {
      enqueueSnackbar("Passwords do not match!", {
        variant: "error",
        preventDuplicate: true,
      });
    }
    if (firstNameError) {
      enqueueSnackbar(
        "First name is invalid! First name has to be at least 1 character long and not contain any numbers. Names can contain dots and white spaces.",
        { variant: "error", preventDuplicate: true }
      );
    }
    if (lastNameError) {
      enqueueSnackbar(
        "Last name is invalid! Last name has to be at least 1 character long and not contain any numbers. Last name can contain white spaces.",
        { variant: "error", preventDuplicate: true }
      );
    }
    if (genderError) {
      enqueueSnackbar("Gender is a required field.", {
        variant: "error",
        preventDuplicate: true,
      });
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
          preventDuplicate: true,
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
        enqueueSnackbar("Error registering account!", {
          variant: "error",
          preventDuplicate: true,
        });
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
              data-test-id="user-username-input"
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
              data-test-id="user-email-input"
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
              data-test-id="user-password-input"
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
              data-test-id="user-confirm-password-input"
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
              data-test-id="user-first-name-input"
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
              data-test-id="user-last-name-input"
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
                data-test-id="user-gender-input-male"
              />{" "}
              Man
              <input
                type="radio"
                name="gender"
                value="Woman"
                onChange={handleGenderChange}
                data-test-id="user-gender-input-female"
              />{" "}
              Woman
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={handleGenderChange}
                data-test-id="user-gender-input-other"
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
            data-test-id="user-register-button"
          >
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterUser;

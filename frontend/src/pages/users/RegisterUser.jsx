import axios from 'axios'
import { BACKEND_URL } from '../../../config.js'
import emailValidator from '../../utils/validation/emailValidator'
import firstNameValidator from '../../utils/validation/firstNameValidator'
import genderValidator from '../../utils/validation/genderValidator'
import lastNameValidator from '../../utils/validation/lastNameValidator'
import Layout from '../../components/layout/Layout'
import passwordValidator from '../../utils/validation/passwordValidator'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import usernameValidator from '../../utils/validation/usernameValidator'
import Loader from '../../components/animated/Loader.jsx'

const RegisterUser = () => {
  // Form input fields as state variables
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  // Error message returned by the server when registering a user fails
  const [registerErrorMessage, setRegisterErrorMessage] = useState('')
  // Error state variables for displaying error messages if the user input is invalid
  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [genderError, setGenderError] = useState(false)
  // Loading state variable for displaying the spinner
  const [loading, setLoading] = useState(false)
  // useNavigate is a hook that returns a navigate function that we can use to navigate to a different page
  const navigate = useNavigate()
  // useSnackbar is a hook that allows us to show a snackbar https://www.npmjs.com/package/notistack https://iamhosseindhv.com/notistack/demos#use-snackbar
  const { enqueueSnackbar } = useSnackbar()
  // Validate user input fields
  const validateUsername = () => {
    if (usernameValidator(username) === false) {
      setUsernameError(true)
    } else {
      setUsernameError(false)
    }
  }
  const validateEmail = () => {
    if (emailValidator(email) === false) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }
  const validatePassword = () => {
    if (passwordValidator(password) === false) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }
  const validateConfirmPassword = () => {
    if (password === confirmPassword) {
      setConfirmPasswordError(false)
      return
    }
    setConfirmPasswordError(true)
  }
  const validateFirstName = () => {
    if (firstNameValidator(firstName) === false) {
      setFirstNameError(true)
    } else {
      setFirstNameError(false)
    }
  }
  const validateLastName = () => {
    if (lastNameValidator(lastName) === false) {
      setLastNameError(true)
    } else {
      setLastNameError(false)
    }
  }
  const validateGender = () => {
    if (genderValidator(gender) === false) {
      setGenderError(true)
    } else {
      setGenderError(false)
    }
  }
  // Handle onChange events for all input fields
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
    if (usernameError) {
      validateUsername()
    }
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    if (emailError) {
      validateEmail()
    }
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    if (passwordError) {
      validatePassword()
    }
  }
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
    if (confirmPasswordError) {
      validateConfirmPassword()
    }
  }
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
    if (firstNameError) {
      validateFirstName()
    }
  }
  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
    if (lastNameError) {
      validateLastName()
    }
  }
  const handleGenderChange = (event) => {
    setGender(event.target.value)
    if (genderError) {
      validateGender()
    }
  }

  // Display error messages if the user enters invalid input with useSnackbar
  useEffect(() => {
    if (usernameError) {
      enqueueSnackbar(
        'Username is invalid! Username has to be alphanumeric and at least 1 character long.',
        { variant: 'error', preventDuplicate: true },
      )
    }
    if (emailError) {
      enqueueSnackbar('Email address is invalid!', { variant: 'error' })
    }
    if (passwordError) {
      enqueueSnackbar(
        'Password is invalid! Password has to be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit and one special character.',
        { variant: 'error', preventDuplicate: true },
      )
    }
    if (confirmPasswordError) {
      enqueueSnackbar('Passwords do not match!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
    if (firstNameError) {
      enqueueSnackbar(
        'First name is invalid! First name has to be at least 1 character long and not contain any numbers. Names can contain dots and white spaces.',
        { variant: 'error', preventDuplicate: true },
      )
    }
    if (lastNameError) {
      enqueueSnackbar(
        'Last name is invalid! Last name has to be at least 1 character long and not contain any numbers. Last name can contain white spaces.',
        { variant: 'error', preventDuplicate: true },
      )
    }
    if (genderError) {
      enqueueSnackbar('Gender is a required field.', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
  }, [
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,
    firstNameError,
    lastNameError,
    genderError,
  ])

  // Handle saving the user to the database
  const handleSaveUser = () => {
    // TODO:

    // Validate all fields before sending the request to the backend, otherwise return
    validateUsername()
    validateEmail()
    validatePassword()
    validateConfirmPassword()
    validateFirstName()
    validateLastName()
    validateGender()
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
      return
    }

    // User data object to send to the backend
    const data = {
      username,
      email,
      password,
      firstName,
      lastName,
      gender,
    }

    // Display the spinner
    setLoading(true)

    // Send a POST request to the backend to save the user to the database
    axios
      .post(`${BACKEND_URL}/users`, data)
      .then(() => {
        // Hide the spinner
        setLoading(false)
        // Display a success message
        enqueueSnackbar('User account registered successfully!', {
          variant: 'success',
          preventDuplicate: true,
        })
        // Navigate to the home page
        navigate('/')
      })
      .catch((error) => {
        // Hide the spinner
        setLoading(false)
        // Display an error message
        setRegisterErrorMessage(error.response.data.message)
        // Display an error message
        enqueueSnackbar('Error registering account!', {
          variant: 'error',
          preventDuplicate: true,
        })
        // Log the error to the console
        console.log(error)
      })
  }

  return (
    <Layout>
      <div className='p-4'>
        <h1 className='flex justify-center text-3xl my-4 mb-6'>Register</h1>
        {loading ? <Loader /> : ''}
        <div className='flex flex-col border-2 border-purple-900 bg-violet-950/40 rounded-xl w-[600px] py-4 px-8 mx-auto'>
          {registerErrorMessage ? (
            <p className='text-red-500 text-sm'>{registerErrorMessage}</p>
          ) : (
            ''
          )}
          <div className='my-4'>
            <label className='text-xl mr-4'>Username</label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                usernameError ? 'border-red-500' : ''
              }`}
              data-testid='user-username-input'
              onBlur={validateUsername}
              onChange={handleUsernameChange}
              type='text'
              value={username}
            />
            {usernameError ? (
              <p className='text-red-500 text-sm'>
                Username must be at least 1 alphanumeric character long.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4'>Email</label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                emailError ? 'border-red-500' : ''
              }`}
              data-testid='user-email-input'
              onBlur={validateEmail}
              onChange={handleEmailChange}
              type='text'
              value={email}
            />
            {emailError ? (
              <p className='text-red-500 text-sm'>
                Email must be a valid email address.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4'>Password</label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                passwordError ? 'border-red-500' : ''
              }`}
              data-testid='user-password-input'
              onBlur={validatePassword}
              onChange={handlePasswordChange}
              type='password'
              value={password}
            />
            {passwordError ? (
              <p className='text-red-500 text-sm'>
                Password must be at least 8 characters long, contain at least
                one uppercase letter, one lowercase letter, one digit and one
                special character.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4'>Confirm Password</label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                confirmPasswordError ? 'border-red-500' : ''
              }`}
              data-testid='user-confirm-password-input'
              onBlur={validateConfirmPassword}
              onChange={handleConfirmPasswordChange}
              type='password'
              value={confirmPassword}
            />
            {confirmPasswordError ? (
              <p className='text-red-500 text-sm'>
                Confirm password does not match password.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4'>First Name</label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                firstNameError ? 'border-red-500' : ''
              }`}
              data-testid='user-first-name-input'
              onBlur={validateFirstName}
              onChange={handleFirstNameChange}
              type='text'
              value={firstName}
            />
            {firstNameError ? (
              <p className='text-red-500 text-sm'>
                First name must be between at least 1 character long and can
                only contain letters, dots, and spaces.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 '>Last Name</label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                lastNameError ? 'border-red-500' : ''
              }`}
              data-testid='user-last-name-input'
              onBlur={validateLastName}
              onChange={handleLastNameChange}
              type='text'
              value={lastName}
            />
            {lastNameError ? (
              <p className='text-red-500 text-sm'>
                Last name must be between at least 1 character long and can only
                contain letters and spaces.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4'>Gender</label> <br />
            <div className='flex flex-row justify-center space-x-16'>
              <input
                data-testid='user-gender-input-male'
                name='gender'
                onChange={handleGenderChange}
                type='radio'
                value='Man'
              />{' '}
              Man
              <input
                data-testid='user-gender-input-female'
                name='gender'
                onChange={handleGenderChange}
                type='radio'
                value='Woman'
              />{' '}
              Woman
              <input
                data-testid='user-gender-input-other'
                name='gender'
                onChange={handleGenderChange}
                type='radio'
                value='Other'
              />{' '}
              Other
            </div>
            {genderError ? (
              <p className='text-red-500 text-sm'>
                Gender is a required field.
              </p>
            ) : (
              ''
            )}
            <br />
          </div>
          <button
            className='bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l rounded-lg p-2 m-8'
            data-testid='user-register-button'
            onClick={handleSaveUser}
          >
            Save
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default RegisterUser

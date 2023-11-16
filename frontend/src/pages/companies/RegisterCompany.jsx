import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL, TEST_KVK_API } from '../../../config.js'
import { useSnackbar } from 'notistack'
import companyNameValidator from '../../utils/validation/companyNameValidator'
import emailValidator from '../../utils/validation/emailValidator'
import phoneNumberValidator from '../../utils/validation/phoneNumberValidator'
import kvkNumberValidator from '../../utils/validation/kvkNumberValidator'
import companySloganValidator from '../../utils/validation/companySloganValidator'
import companyDescriptionValidator from '../../utils/validation/companyDescriptionValidator'
import startYearValidator from '../../utils/validation/startYearValidator'
import { useSelector } from 'react-redux'
import CompanyLogoModal from '../../components/companies/CompanyLogoModal'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/animated/Loader.jsx'

const RegisterCompany = () => {
  // Input field values for registering a company as state
  const [name, setName] = useState(''),
    [logo, setLogo] = useState(''),
    [email, setEmail] = useState(''),
    [phone, setPhone] = useState(''),
    [kvkNumber, setKvkNumber] = useState(''),
    [slogan, setSlogan] = useState(''),
    [description, setDescription] = useState(''),
    [startYear, setStartYear] = useState(''),
    // Error state for displaying error messages if the user enters invalid input
    [nameError, setNameError] = useState(false),
    [emailError, setEmailError] = useState(false),
    [phoneError, setPhoneError] = useState(false),
    [kvkNumberError, setKvkNumberError] = useState(false),
    [sloganError, setSloganError] = useState(false),
    [descriptionError, setDescriptionError] = useState(false),
    [startYearError, setStartYearError] = useState(false),
    // Specific error messages to display when the user enters invalid input
    [kvkNumberErrorMessage, setKvkNumberErrorMessage] = useState(''),
    // Set showLogoModal to true to show the modal for uploading a company logo
    [showLogoModal, setShowLogoModal] = useState(false),
    // Loading state for displaying a spinner while the request is being sent to the backend
    [loading, setLoading] = useState(false),
    //  Get the userId from the Redux store
    userId = useSelector((state) => state.userId),
    // useNavigate is a hook that returns a navigate function that we can use to navigate to a different page
    navigate = useNavigate(),
    // useSnackbar is a hook that allows us to show a snackbar https://www.npmjs.com/package/notistack https://iamhosseindhv.com/notistack/demos#use-snackbar
    { enqueueSnackbar } = useSnackbar()

  // Validation functions for validating the input fields and put a red border around the input field if the input is invalid
  // and display an error message under the input field explaining the right format
  const validateCompanyName = () => {
      if (companyNameValidator(name)) {
        setNameError(false)
      } else {
        setNameError(true)
      }
    },
    validateEmail = () => {
      if (emailValidator(email)) {
        setEmailError(false)
      } else {
        setEmailError(true)
      }
    },
    validatePhone = () => {
      if (phoneNumberValidator(phone, 'NL')) {
        setPhoneError(false)
      } else {
        setPhoneError(true)
      }
    },
    validateKvkNumber = async () => {
      if (await kvkNumberValidator(kvkNumber)) {
        setKvkNumberError(false)
      } else {
        setKvkNumberError(true)
        throw new Error('Invalid KVK number!')
      }
    },
    validateSlogan = () => {
      if (companySloganValidator(slogan)) {
        setSloganError(false)
      } else {
        setSloganError(true)
      }
    },
    validateDescription = () => {
      if (companyDescriptionValidator(description)) {
        setDescriptionError(false)
      } else {
        setDescriptionError(true)
      }
    },
    validateStartYear = () => {
      if (startYearValidator(startYear)) {
        setStartYearError(false)
      } else {
        setStartYearError(true)
      }
    }

  // Handle onChange events for all input fields
  const handleNameChange = (event) => {
      setName(event.target.value)
      if (nameError) {
        validateCompanyName()
      }
    },
    handleEmailChange = (event) => {
      setEmail(event.target.value)
      if (emailError) {
        validateEmail()
      }
    },
    handlePhoneChange = (event) => {
      setPhone(event.target.value)
      if (phoneError) {
        validatePhone()
      }
    },
    handleKvkNumberChange = async (event) => {
      setKvkNumber(event.target.value)
      if (kvkNumberError) {
        await validateKvkNumber()
      }
    },
    handleSloganChange = (event) => {
      setSlogan(event.target.value)
      if (sloganError) {
        validateSlogan()
      }
    },
    handleDescriptionChange = (event) => {
      setDescription(event.target.value)
      if (descriptionError) {
        validateDescription()
      }
    },
    handleStartYearChange = (event) => {
      setStartYear(event.target.value)
      if (startYearError) {
        validateStartYear()
      }
    }

  // Display error messages if the user enters invalid input with useSnackbar
  useEffect(() => {
    if (nameError) {
      enqueueSnackbar('Company name is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
    if (emailError) {
      enqueueSnackbar('Email is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
    if (phoneError) {
      enqueueSnackbar('Phone number is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
    if (kvkNumberError) {
      enqueueSnackbar('KVK number is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
    if (sloganError) {
      enqueueSnackbar('Slogan is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
    if (descriptionError) {
      enqueueSnackbar('Description is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
    if (startYearError) {
      enqueueSnackbar('Start year is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
  }, [
    nameError,
    emailError,
    phoneError,
    kvkNumberError,
    sloganError,
    descriptionError,
    startYearError,
  ])

  const handleSaveCompany = async () => {
    // Validate all fields before sending the request to the backend, otherwise return
    validateCompanyName()
    validateEmail()
    validatePhone()
    try {
      await validateKvkNumber()
    } catch (error) {
      enqueueSnackbar('Error validating KVK number!', {
        variant: 'error',
        preventDuplicate: true,
      })
      console.log(error)
      return
    }
    validateSlogan()
    validateDescription()
    validateStartYear()
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
        'Please fill in all fields correctly before saving this company!',
        {
          variant: 'error',
          preventDuplicate: true,
        },
      )
      return
    }

    const data = {
      name,
      logo,
      email,
      phone,
      kvkNumber,
      slogan,
      startYear,
      description,
      owners: [{ userId }],
    }
    setLoading(true)
    axios
      .post(`${BACKEND_URL}/companies`, data)
      .then(() => {
        setLoading(false)
        enqueueSnackbar('Company registered successfully!', {
          variant: 'success',
          preventDuplicate: true,
        })
        navigate('/companies')
      })
      .catch((error) => {
        console.log('error.response', error.response)
        if (error.response.status === 409) {
          enqueueSnackbar('Company with this KVK number already exists!', {
            variant: 'error',
            preventDuplicate: true,
          })
          setKvkNumberError(true)
          setKvkNumberErrorMessage(
            'Company with this KVK number already exists!',
          )
        }

        setLoading(false)
        enqueueSnackbar('Error registering company!', {
          variant: 'error',
          preventDuplicate: true,
        })
        console.log(error)
      })
  }

  return (
    <Layout>
      <div className='p-4'>
        <h1 className='flex justify-center text-3xl my-4 mb-6'>
          Register Company
        </h1>
        {loading ? <Loader /> : ''}
        <div className='flex flex-col border-2 border-purple-900 bg-violet-950/40 rounded-xl w-[600px] py-4 px-8 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4' htmlFor='company-name-input'>
              Name
            </label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                nameError ? 'border-red-500' : ''
              }`}
              data-testid='company-name-input'
              id='company-name-input'
              onBlur={validateCompanyName}
              onChange={handleNameChange}
              type='text'
              value={name}
            />
            {nameError ? (
              <p className='text-red-500 text-sm'>
                Company name must be between 1 and 60 characters long and can
                only contain letters, numbers, spaces, and the following
                characters: &#45;, &apos;, and &#46;
              </p>
            ) : (
              ''
            )}
          </div>
          {/* Company logo */}
          <div className='my-4'>
            <span className='text-xl mr-4'>Logo</span>
            <div className='w-full'>
              <div className='flex justify-center items-center my-4'>
                <div className='flex justify-center'>
                  {logo ? (
                    <img alt='Preview' height='200' src={logo} width='200' />
                  ) : null}
                </div>
              </div>
              <div className='flex justify-center items-center mb-4 mt-8'>
                <button
                  className='bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l rounded-lg p-2 m-8'
                  data-testid='upload-logo-button'
                  onClick={() => setShowLogoModal(true)}
                  type='button'
                >
                  Upload Logo
                </button>
              </div>
              {showLogoModal ? (
                <CompanyLogoModal
                  onClose={() => setShowLogoModal(false)}
                  setLogo={setLogo}
                />
              ) : null}
            </div>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4' htmlFor='company-email-input'>
              Email
            </label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                emailError ? 'border-red-500' : ''
              }`}
              data-testid='company-email-input'
              id='company-email-input'
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
            <label className='text-xl mr-4' htmlFor='company-phone-input'>
              Phone
            </label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                phoneError ? 'border-red-500' : ''
              }`}
              data-testid='company-phone-input'
              id='company-phone-input'
              onBlur={validatePhone}
              onChange={handlePhoneChange}
              type='text'
              value={phone}
            />
          </div>
          {phoneError ? (
            <p className='text-red-500 text-sm'>
              Phone number must be a valid phone number.
            </p>
          ) : (
            ''
          )}
          <div className='my-4'>
            <label className='text-xl mr-4' htmlFor='company-kvk-number-input'>
              KVK Number
            </label>
            {TEST_KVK_API ? (
              <div className='mb-4'>
                <p className='text-gray-400'>
                  <strong>Note:</strong> Use KVK numbers from{' '}
                  <a
                    className='text-blue-600'
                    data-testid='kvk-api-link'
                    href='https://developers.kvk.nl/documentation/testing'
                  >
                    this page
                  </a>
                </p>
              </div>
            ) : (
              ''
            )}
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                kvkNumberError ? 'border-red-500' : ''
              }`}
              data-testid='company-kvk-number-input'
              id='company-kvk-number-input'
              onBlur={validateKvkNumber}
              onChange={handleKvkNumberChange}
              type='text'
              value={kvkNumber}
            />
            {kvkNumberError ? (
              <p className='text-red-500 text-sm'>
                {kvkNumberErrorMessage
                  ? kvkNumberErrorMessage
                  : 'Must be a valid KVK number.'}
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4' htmlFor='company-slogan-input'>
              Slogan
            </label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                sloganError ? 'border-red-500' : ''
              }`}
              data-testid='company-slogan-input'
              id='company-slogan-input'
              onBlur={validateSlogan}
              onChange={handleSloganChange}
              type='text'
              value={slogan}
            />
            {sloganError ? (
              <p className='text-red-500 text-sm'>
                This should be the motto of your company. It must be between 1
                and 90 characters long.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4' htmlFor='company-description-input'>
              Company Description
            </label>
            <textarea
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                descriptionError ? 'border-red-500' : ''
              }`}
              data-testid='company-description-input'
              id='company-description-input'
              onBlur={validateDescription}
              onChange={handleDescriptionChange}
              value={description}
            />
            {descriptionError ? (
              <p className='text-red-500 text-sm'>
                This should be the description of your company. It must be
                between 1 and 280 characters long.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4' htmlFor='company-start-year-input'>
              Start Year
            </label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                startYearError ? 'border-red-500' : ''
              }`}
              data-testid='company-start-year-input'
              id='company-start-year-input'
              onBlur={validateStartYear}
              onChange={handleStartYearChange}
              type='number'
              value={startYear}
            />
            {startYearError ? (
              <p className='text-red-500 text-sm'>
                Start year must be a valid year and never can be later then the
                current year. If company hasn&apos;t started yet, register
                company when it starts.
              </p>
            ) : (
              ''
            )}
          </div>
          <button
            className='bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l rounded-lg p-2 m-8'
            data-testid='save-register-company-button'
            onClick={handleSaveCompany}
            type='button'
          >
            Save
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default RegisterCompany

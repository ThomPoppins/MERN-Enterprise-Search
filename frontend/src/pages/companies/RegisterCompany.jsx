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
import EditCompanyLogoModal from '../../components/companies/EditCompanyLogoModal'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/animated/Loader.jsx'

const RegisterCompany = () => {
  // Input field values for registering a company as state
  const [name, setName] = useState('')
  const [logoId, setLogoId] = useState('')
  const [logoPreview, setLogoPreview] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [kvkNumber, setKvkNumber] = useState('')
  const [slogan, setSlogan] = useState('')
  const [description, setDescription] = useState('')
  const [startYear, setStartYear] = useState('')
  // Error state for displaying error messages if the user enters invalid input
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [kvkNumberError, setKvkNumberError] = useState(false)
  const [sloganError, setSloganError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [startYearError, setStartYearError] = useState(false)
  // Specific error messages to display when the user enters invalid input
  const [kvkNumberErrorMessage, setKvkNumberErrorMessage] = useState('')
  // Set showLogoModal to true to show the modal for uploading a company logo
  const [showLogoModal, setShowLogoModal] = useState(false)
  // Loading state for displaying a spinner while the request is being sent to the backend
  const [loading, setLoading] = useState(false)
  //  Get the userId from the Redux store
  const userId = useSelector((state) => state.userId)
  // useNavigate is a hook that returns a navigate function that we can use to navigate to a different page
  const navigate = useNavigate()
  // useSnackbar is a hook that allows us to show a snackbar https://www.npmjs.com/package/notistack https://iamhosseindhv.com/notistack/demos#use-snackbar
  const { enqueueSnackbar } = useSnackbar()

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
      logoId,
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

  useEffect(() => {
    if (logoId) {
      // Get image URL from backend
      axios.get(`${BACKEND_URL}/files/image-url/${logoId}`).then((response) => {
        setLogoPreview(response.data.imageURL)
      })
    }
  }, [logoId])

  return (
    <Layout>
      <div className='p-4'>
        <h1 className='my-4 mb-6 flex justify-center text-3xl'>
          Register Company
        </h1>
        {loading ? <Loader /> : ''}
        <div className='mx-auto flex w-[600px] flex-col rounded-xl border-2 border-purple-900 bg-violet-950/40 px-8 py-4'>
          <div className='my-4'>
            <label className='mr-4 text-xl' htmlFor='company-name-input'>
              Name
            </label>
            <input
              className={`w-full rounded-xl border-2 border-purple-900 bg-cyan-100 px-4 py-2 text-gray-800 focus:bg-white ${
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
              <p className='text-sm text-red-500'>
                Company name must be between 1 and 60 characters long and can
                only contain letters, numbers, spaces, and the following
                characters: {`!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`}
              </p>
            ) : (
              ''
            )}
          </div>
          {/* Company logo */}
          <div className='my-4'>
            <span className='mr-4 text-xl'>Logo</span>
            <div className='w-full'>
              <div className='my-4 flex items-center justify-center'>
                <div className='flex justify-center'>
                  {logoPreview ? (
                    <img
                      alt='Preview'
                      className='rounded-full'
                      height='200'
                      src={`${BACKEND_URL}${logoPreview}`}
                      width='200'
                    />
                  ) : null}
                </div>
              </div>
              <div className='mb-4 mt-8 flex items-center justify-center'>
                <button
                  className='m-8 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 p-2 hover:bg-purple-700 hover:bg-gradient-to-l'
                  data-testid='upload-logo-button'
                  onClick={() => setShowLogoModal(true)}
                  type='button'
                >
                  Upload Logo
                </button>
              </div>
              {showLogoModal ? (
                <EditCompanyLogoModal
                  onClose={() => setShowLogoModal(false)}
                  setLogoId={setLogoId}
                />
              ) : null}
            </div>
          </div>
          <div className='my-4'>
            <label className='mr-4 text-xl' htmlFor='company-email-input'>
              Email
            </label>
            <input
              className={`w-full rounded-xl border-2 border-purple-900 bg-cyan-100 px-4 py-2 text-gray-800 focus:bg-white ${
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
              <p className='text-sm text-red-500'>
                Email must be a valid email address.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='mr-4 text-xl' htmlFor='company-phone-input'>
              Phone
            </label>
            <input
              className={`w-full rounded-xl border-2 border-purple-900 bg-cyan-100 px-4 py-2 text-gray-800 focus:bg-white ${
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
            <p className='text-sm text-red-500'>
              Phone number must be a valid phone number.
            </p>
          ) : (
            ''
          )}
          <div className='my-4'>
            <label className='mr-4 text-xl' htmlFor='company-kvk-number-input'>
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
              className={`w-full rounded-xl border-2 border-purple-900 bg-cyan-100 px-4 py-2 text-gray-800 focus:bg-white ${
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
              <p className='text-sm text-red-500'>
                {kvkNumberErrorMessage
                  ? kvkNumberErrorMessage
                  : 'Must be a valid KVK number.'}
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='mr-4 text-xl' htmlFor='company-slogan-input'>
              Slogan
            </label>
            <input
              className={`w-full rounded-xl border-2 border-purple-900 bg-cyan-100 px-4 py-2 text-gray-800 focus:bg-white ${
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
              <p className='text-sm text-red-500'>
                This should be the motto of your company. It must be between 1
                and 90 characters long.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='mr-4 text-xl' htmlFor='company-description-input'>
              Company Description
            </label>
            <textarea
              className={`w-full rounded-xl border-2 border-purple-900 bg-cyan-100 px-4 py-2 text-gray-800 focus:bg-white ${
                descriptionError ? 'border-red-500' : ''
              }`}
              data-testid='company-description-input'
              id='company-description-input'
              onBlur={validateDescription}
              onChange={handleDescriptionChange}
              value={description}
            />
            {descriptionError ? (
              <p className='text-sm text-red-500'>
                This should be the description of your company. It must be
                between 1 and 280 characters long.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='mr-4 text-xl' htmlFor='company-start-year-input'>
              Start Year
            </label>
            <input
              className={`w-full rounded-xl border-2 border-purple-900 bg-cyan-100 px-4 py-2 text-gray-800 focus:bg-white ${
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
              <p className='text-sm text-red-500'>
                Start year must be a valid year and never can be later then the
                current year. If company hasn&apos;t started yet, register
                company when it starts.
              </p>
            ) : (
              ''
            )}
          </div>
          <button
            className='m-8 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 p-2 hover:bg-purple-700 hover:bg-gradient-to-l'
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

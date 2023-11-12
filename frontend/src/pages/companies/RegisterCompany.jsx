import React, { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL, TEST_KVK_API } from '../../../config.js';
import { useSnackbar } from 'notistack';
import companyNameValidator from '../../utils/validation/companyNameValidator';
import emailValidator from '../../utils/validation/emailValidator';
import phoneNumberValidator from '../../utils/validation/phoneNumberValidator';
import kvkNumberValidator from '../../utils/validation/kvkNumberValidator';
import companySloganValidator from '../../utils/validation/companySloganValidator';
import companyDescriptionValidator from '../../utils/validation/companyDescriptionValidator';
import startYearValidator from '../../utils/validation/startYearValidator';
import { useSelector } from 'react-redux';
import CompanyLogoModal from '../../components/companies/CompanyLogoModal';
import Layout from '../../components/layout/Layout';

const RegisterCompany = () => {
  // Input field values for registering a company as state
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [kvkNumber, setKvkNumber] = useState('');
  const [slogan, setSlogan] = useState('');
  const [description, setDescription] = useState('');
  const [startYear, setStartYear] = useState('');

  // Error state for displaying error messages if the user enters invalid input
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [kvkNumberError, setKvkNumberError] = useState(false);
  const [sloganError, setSloganError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [startYearError, setStartYearError] = useState(false);

  // Specific error messages to display when the user enters invalid input
  const [kvkNumberErrorMessage, setKvkNumberErrorMessage] = useState('');

  // Set showLogoModal to true to show the modal for uploading a company logo
  const [showLogoModal, setShowLogoModal] = useState(false);

  // Loading state for displaying a spinner while the request is being sent to the backend
  const [loading, setLoading] = useState(false);

  // @ts-ignore Get the userId from the Redux store
  const userId = useSelector((state) => state.userId);

  // useNavigate is a hook that returns a navigate function that we can use to navigate to a different page
  const navigate = useNavigate();

  // useSnackbar is a hook that allows us to show a snackbar https://www.npmjs.com/package/notistack https://iamhosseindhv.com/notistack/demos#use-snackbar
  const { enqueueSnackbar } = useSnackbar();

  // Validation functions for validating the input fields and put a red border around the input field if the input is invalid
  // and display an error message under the input field explaining the right format
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
    if (!phoneNumberValidator(phone, 'NL')) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };
  const validateKvkNumber = async () => {
    if (!(await kvkNumberValidator(kvkNumber))) {
      setKvkNumberError(true);
      throw new Error('Invalid KVK number!');
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
  const validateDescription = () => {
    if (!companyDescriptionValidator(description)) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
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
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (descriptionError) {
      validateDescription();
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
      enqueueSnackbar('Company name is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      });
    }
    if (emailError) {
      enqueueSnackbar('Email is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      });
    }
    if (phoneError) {
      enqueueSnackbar('Phone number is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      });
    }
    if (kvkNumberError) {
      enqueueSnackbar('KVK number is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      });
    }
    if (sloganError) {
      enqueueSnackbar('Slogan is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      });
    }
    if (descriptionError) {
      enqueueSnackbar('Description is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      });
    }
    if (startYearError) {
      enqueueSnackbar('Start year is invalid!', {
        variant: 'error',
        preventDuplicate: true,
      });
    }
  }, [
    nameError,
    emailError,
    phoneError,
    kvkNumberError,
    sloganError,
    descriptionError,
    startYearError,
  ]);

  const handleSaveCompany = async () => {
    // Validate all fields before sending the request to the backend, otherwise return
    validateCompanyName();
    validateEmail();
    validatePhone();
    try {
      await validateKvkNumber();
    } catch (error) {
      enqueueSnackbar('Error validating KVK number!', {
        variant: 'error',
        preventDuplicate: true,
      });
      console.log(error);
      return;
    }
    validateSlogan();
    validateDescription();
    validateStartYear();
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
      enqueueSnackbar('Please fill in all fields correctly before saving this company!', {
        variant: 'error',
        preventDuplicate: true,
      });
      return;
    }

    const data = {
      // TODO: [MERNSTACK-132] Add all companies fields that can be registered
      name: name,
      logo: logo,
      email: email,
      phone: phone,
      kvkNumber: kvkNumber,
      slogan: slogan,
      startYear: startYear,
      description: description,
      owners: [{ userId: userId }], // Make sure that the user that registers the company is added as an owner
    };
    setLoading(true);
    axios
      .post(BACKEND_URL + '/companies', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Company registered successfully!', {
          variant: 'success',
          preventDuplicate: true,
        });
        navigate('/companies');
      })
      .catch((error) => {
        console.log('error.response', error.response);
        if (error.response.status === 409) {
          enqueueSnackbar('Company with this KVK number already exists!', {
            variant: 'error',
            preventDuplicate: true,
          });
          setKvkNumberError(true);
          setKvkNumberErrorMessage('Company with this KVK number already exists!');
        }

        setLoading(false);
        enqueueSnackbar('Error registering company!', {
          variant: 'error',
          preventDuplicate: true,
        });
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className='p-4'>
        <h1 className='flex justify-center text-3xl my-4 mb-6'>Register Company</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-purple-900 bg-violet-950/40 rounded-xl w-[600px] py-4 px-8 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4'>Name</label>
            <input
              type='text'
              value={name}
              onChange={handleNameChange}
              onBlur={validateCompanyName}
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                nameError ? 'border-red-500' : ''
              }`}
              data-test-id='company-name-input'
            />
            {nameError ? (
              <p className='text-red-500 text-sm'>
                Company name must be between 1 and 60 characters long and can only contain letters,
                numbers, spaces, and the following characters: &#45;, &apos;, and &#46;
              </p>
            ) : (
              ''
            )}
          </div>
          {/* Company logo */}
          <div className='my-4'>
            <label className='text-xl mr-4'>Logo</label>
            <div className='w-full'>
              <div className='flex justify-center items-center my-4'>
                <div className='flex justify-center'>
                  {logo && <img src={logo} alt='Preview' width='200' height='200' />}
                </div>
              </div>
              <div className='flex justify-center items-center mb-4 mt-8'>
                <button
                  className='bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l rounded-lg p-2 m-8'
                  onClick={() => setShowLogoModal(true)}
                  data-test-id='upload-logo-button'
                >
                  Upload Logo
                </button>
              </div>
              {showLogoModal && (
                <CompanyLogoModal setLogo={setLogo} onClose={() => setShowLogoModal(false)} />
              )}
            </div>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4'>Email</label>
            <input
              type='text'
              value={email}
              onChange={handleEmailChange}
              data-test-id='company-email-input'
              onBlur={validateEmail}
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                emailError ? 'border-red-500' : ''
              }`}
            />
            {emailError ? (
              <p className='text-red-500 text-sm'>Email must be a valid email address.</p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4'>Phone</label>
            <input
              type='text'
              value={phone}
              onChange={handlePhoneChange}
              data-test-id='company-phone-input'
              onBlur={validatePhone}
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                phoneError ? 'border-red-500' : ''
              }`}
            />
          </div>
          {phoneError ? (
            <p className='text-red-500 text-sm'>Phone number must be a valid phone number.</p>
          ) : (
            ''
          )}
          <div className='my-4'>
            <label className='text-xl mr-4'>KVK Number</label>
            {TEST_KVK_API ? (
              <div className='mb-4'>
                <p className='text-gray-400'>
                  <strong>Note:</strong> Use KVK numbers from{' '}
                  <a
                    className='text-blue-600'
                    href='https://developers.kvk.nl/documentation/testing'
                    data-test-id='kvk-api-link'
                  >
                    this page
                  </a>
                </p>
              </div>
            ) : (
              ''
            )}
            <input
              type='text'
              value={kvkNumber}
              onChange={handleKvkNumberChange}
              data-test-id='company-kvk-number-input'
              onBlur={validateKvkNumber}
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                kvkNumberError ? 'border-red-500' : ''
              }`}
            />
            {kvkNumberError ? (
              <p className='text-red-500 text-sm'>
                {kvkNumberErrorMessage ? kvkNumberErrorMessage : 'Must be a valid KVK number.'}
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4'>Slogan</label>
            <input
              type='text'
              value={slogan}
              onChange={handleSloganChange}
              data-test-id='company-slogan-input'
              onBlur={validateSlogan}
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                sloganError ? 'border-red-500' : ''
              }`}
            />
            {sloganError ? (
              <p className='text-red-500 text-sm'>
                This should be the motto of your company. It must be between 1 and 90 characters
                long.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4'>Company Description</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              data-test-id='company-description-input'
              onBlur={validateDescription}
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                descriptionError ? 'border-red-500' : ''
              }`}
            />
            {descriptionError ? (
              <p className='text-red-500 text-sm'>
                This should be the description of your company. It must be between 1 and 280
                characters long.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4'>Start Year</label>
            <input
              type='number'
              value={startYear}
              onChange={handleStartYearChange}
              data-test-id='company-start-year-input'
              onBlur={validateStartYear}
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                startYearError ? 'border-red-500' : ''
              }`}
            />
            {startYearError ? (
              <p className='text-red-500 text-sm'>
                Start year must be a valid year and never can be later then the current year. If
                company hasn't started yet, register company when it starts.
              </p>
            ) : (
              ''
            )}
          </div>
          <button
            className='bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l rounded-lg p-2 m-8'
            onClick={handleSaveCompany}
            data-test-id='save-register-company-button'
          >
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterCompany;

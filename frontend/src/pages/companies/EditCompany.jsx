import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { BACKEND_URL, TEST_KVK_API } from '../../../config.js'
import { useSnackbar } from 'notistack'
import companyNameValidator from '../../utils/validation/companyNameValidator'
import emailValidator from '../../utils/validation/emailValidator'
import phoneNumberValidator from '../../utils/validation/phoneNumberValidator'
import kvkNumberValidator from '../../utils/validation/kvkNumberValidator'
import companySloganValidator from '../../utils/validation/companySloganValidator'
import companyDescriptionValidator from '../../utils/validation/companyDescriptionValidator'
import startYearValidator from '../../utils/validation/startYearValidator'
import UserSearch from '../../components/UserSearch'
import { VscMail, VscMention, VscPerson } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { PENDING_RECIEVED_INVITES } from '../../store/actions'
import store from '../../store/store'
import CompanyLogoModal from '../../components/companies/CompanyLogoModal'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/animated/Loader.jsx'

const EditCompany = () => {
  // Get the companyId from the URL
  const { id } = useParams(),
    companyId = id,
    userId = useSelector((state) => state.userId),
    user = useSelector((state) => state.user),
    // Input field values for editing a company as state
    [name, setName] = useState(''),
    [logo, setLogo] = useState(''),
    [email, setEmail] = useState(''),
    [phone, setPhone] = useState(''),
    [kvkNumber, setKvkNumber] = useState(''),
    [slogan, setSlogan] = useState(''),
    [description, setDescription] = useState(''),
    [startYear, setStartYear] = useState(0),
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
    // Owners state
    [owners, setOwners] = useState([]),
    // Pending ownership invites state
    [pendingOwnershipInvites, setPendingOwnershipInvites] = useState([]),
    // Search results state for searching users to add as owners
    [usersResult, setUsersResult] = useState([]),
    // Removed owners ids
    [removedOwnersIds, setRemovedOwnersIds] = useState([]),
    // Set showLogoModal to true to show the modal for uploading a company logo
    [showLogoModal, setShowLogoModal] = useState(false),
    // Display a spinner when loading data from the backend
    [loading, setLoading] = useState(false),
    // useNavigate is a hook that allows us to navigate to a different page
    navigate = useNavigate(),
    // useSnackbar is a hook that allows us to show a snackbar https://www.npmjs.com/package/notistack https://iamhosseindhv.com/notistack/demos#use-snackbar
    { enqueueSnackbar } = useSnackbar()

  // Get pending ownership invites from the sender
  // useEffect(() => {
  //   getSenderPendingOwnershipInvites()
  // }, [companyId, userId, user])

  // Validation functions for validating the input fields and put a red border around the input field if the input is invalid
  // and display an error message under the input field explaining the right format
  const validateCompanyName = () => {
    if (companyNameValidator(name)) {
      setNameError(false)
    } else {
      setNameError(true)
    }
  }
  const validateEmail = () => {
    if (emailValidator(email)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }
  const validatePhone = () => {
    if (phoneNumberValidator(phone, 'NL')) {
      setPhoneError(false)
    } else {
      setPhoneError(true)
    }
  }
  const validateKvkNumber = async () => {
    if (await kvkNumberValidator(kvkNumber)) {
      setKvkNumberError(false)
    } else {
      setKvkNumberError(true)
      throw new Error('Invalid KVK number!')
    }
  }
  const validateSlogan = () => {
    if (companySloganValidator(slogan)) {
      setSloganError(false)
    } else {
      setSloganError(true)
    }
  }
  const validateDescription = () => {
    if (companyDescriptionValidator(description)) {
      setDescriptionError(false)
    } else {
      setDescriptionError(true)
    }
  }
  const validateStartYear = () => {
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
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    if (emailError) {
      validateEmail()
    }
  }
  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
    if (phoneError) {
      validatePhone()
    }
  }
  const handleKvkNumberChange = async (event) => {
    setKvkNumber(event.target.value)
    if (kvkNumberError) {
      await validateKvkNumber()
    }
  }
  const handleSloganChange = (event) => {
    setSlogan(event.target.value)
    if (sloganError) {
      validateSlogan()
    }
  }
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
    if (descriptionError) {
      validateDescription()
    }
  }
  const handleStartYearChange = (event) => {
    setStartYear(event.target.value)
    if (startYearError) {
      validateStartYear()
    }
  }

  // Display error messages when the user enters invalid input
  useEffect(() => {
    if (nameError) {
      enqueueSnackbar('Invalid company name!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
    if (emailError) {
      enqueueSnackbar('Invalid email!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
    if (phoneError) {
      enqueueSnackbar('Invalid phone number!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
    if (kvkNumberError) {
      enqueueSnackbar('Invalid KVK number!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
    if (sloganError) {
      enqueueSnackbar('Invalid slogan!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
    if (descriptionError) {
      enqueueSnackbar('Invalid description!', {
        variant: 'error',
        preventDuplicate: true,
      })
    }
    if (startYearError) {
      enqueueSnackbar('Invalid start year!', {
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

  // useEffect() is a hook that runs a function when the component is rendered
  useEffect(() => {
    setLoading(true)
    axios
      .get(`${BACKEND_URL}/companies/${companyId}`)
      .then((response) => {
        setLoading(false)
        setName(response.data.name)
        setLogo(response.data.logo)
        setEmail(response.data.email)
        setPhone(response.data.phone)
        setKvkNumber(response.data.kvkNumber)
        setSlogan(response.data.slogan)
        setDescription(response.data.description)
        setStartYear(response.data.startYear)

        // Set owners
        const userIds = []
        response.data.owners.forEach((owner) => {
          userIds.push(owner.userId)
        })

        // Get all owners data
        const ownerPromises = userIds.map((ownerUserId) =>
          axios.get(`${BACKEND_URL}/users/user/${ownerUserId}`),
        )

        // Resolve all promises to get owners user data
        Promise.all(ownerPromises)
          .then((responses) => {
            const ownersData = responses.map(
              (ownersResponse) => ownersResponse.data,
            )
            //
            setOwners(ownersData)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        setLoading(false)
        enqueueSnackbar('Error fetching company, please check the console.', {
          variant: 'error',
          preventDuplicate: true,
        })
        // ! TODO: Remove console.log and write errors to error log file
        console.log('ERROR fetching company in useEffect(): ', error)
      })
  }, [])

  // handleEditCompany is a function that sends a PUT request to the backend to update a company
  const handleEditCompany = async () => {
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
      descriptionError ||
      startYearError ||
      !name ||
      !email ||
      !phone ||
      !kvkNumber ||
      !slogan ||
      !description ||
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
      description,
      startYear,
    }
    setLoading(true)
    axios
      .put(`${BACKEND_URL}/companies/${companyId}`, data)
      .then(() => {
        setLoading(false)
        enqueueSnackbar('Company edited successfully!', {
          variant: 'success',
          preventDuplicate: true,
        })
        navigate('/companies')
      })
      .catch((error) => {
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
        enqueueSnackbar('Error editing company!', {
          variant: 'error',
          preventDuplicate: true,
        })
        console.log(error)
      })
  }

  // Get company related pending ownership invites
  const getCompanyPendingOwnershipInvites = async () => {
    if (!userId || !user || !companyId) {
      return
    }
    // Get all pending ownership invites for this company
    const pendingInvites = await axios
      .get(`${BACKEND_URL}/invites/company/pending`, {
        headers: {
          // Send the company id in the headers
          companyid: companyId,
        },
      })
      .catch((error) => {
        enqueueSnackbar('Error fetching pending ownership invites', {
          variant: 'error',
          preventDuplicate: true,
        })
        console.log('ERROR in getPendingOwnershipInvites: ', error)
      })
    Promise.resolve(pendingInvites).then((response) => {
      //  Set the pending ownership invites state
      setPendingOwnershipInvites(response.data)
    })
  }

  // getCompanyPendingOwnershipInvites()

  // Update pending ownership invites every 5 seconds
  useEffect(() => {
    // Set interval
    const interval = setInterval(() => {
      getCompanyPendingOwnershipInvites()
    }, 5000)

    // Clear interval on unmount
    return () => clearInterval(interval)
  }, [userId, user, companyId])

  // Add pending ownership invite
  const addPendingOwnershipInvite = async (event) => {
    // Prevent the form from submitting
    event.preventDefault()
    // Get the id of the user to be invited as an owner
    const invitedOwnerId = event.target.value
    console.log('invitedOwnerId: ', invitedOwnerId)
    // Make an API call to invite the user as an owner
    await axios
      .post(`${BACKEND_URL}/invites`, {
        senderId: userId,
        receiverId: invitedOwnerId,
        companyId,
        kind: 'company_ownership',
        status: 'pending',
      })
      .then((response) => {
        //! REMOVE console.log
        console.log(
          'UserSearch.jsx response.data invite ownership: ',
          response.data,
        )
        // Filter the invited owner from the search results
        const newUsersResult = usersResult.filter(
          (userResult) => userResult._id !== invitedOwnerId,
        )
        //   Update the search results
        setUsersResult(newUsersResult)
        //  Add the pending ownership invite to the pending ownership invites state
        setPendingOwnershipInvites([...pendingOwnershipInvites, response.data])
        enqueueSnackbar('Co-owner invited!', {
          variant: 'success',
          preventDuplicate: true,
        })
      })
      .catch((error) => {
        enqueueSnackbar('Error inviting user as owner', {
          variant: 'error',
          preventDuplicate: true,
        })
        console.log(
          'ERROR in UserSearch.jsx invite owner API call: ',
          error.response.data,
        )
      })
  }

  const handleCancelPendingOwnershipInvite = (event) => {
    // Prevent the form from submitting
    event.preventDefault()

    // Get the id of the pending ownership invite to be canceled
    const inviteId = event.target.value

    console.log(
      'handleCancelPendingOwnershipInvite pendingOwnershipInviteId: ',
      inviteId,
    )

    // Make an API call to cancel the pending ownership invite
    axios
      .put(`${BACKEND_URL}/invites/status/${inviteId}`, {
        status: 'canceled',
      })
      .then((response) => {
        console.log(
          'handleCancelPendingOwnershipInvite response.data: ',
          response.data,
        )

        // Remove the canceled pending ownership invite from the pending ownership invites state
        const newPendingOwnershipInvites = pendingOwnershipInvites.filter(
          (invite) => invite._id !== inviteId,
        )

        //
        setPendingOwnershipInvites(newPendingOwnershipInvites || [])

        store.dispatch({
          type: PENDING_RECIEVED_INVITES,
          payload: newPendingOwnershipInvites || [],
        })

        // Add the user that was removed as an invited owner back to the search results
        console.log('Users result before adding user back: ', usersResult)

        //  Update the search results and filter out the user that was removed to be an invited owner
        setUsersResult(
          usersResult.filter(
            (userData) => userData._id !== response.data.receiverId,
          ),
        )
      })
      .catch((error) => {
        enqueueSnackbar('Error canceling pending ownership invite', {
          variant: 'error',
          preventDuplicate: true,
        })
        // ! TODO: Remove console.log and write errors to logfile
        console.log('ERROR in handleCancelPendingOwnershipInvite: ', error)
      })
  }

  const handleRemoveUserAsCompanyOwner = (event) => {
    // ! TODO: Remove console.log
    console.log(
      'handleRemoveUserAsCompanyOwner e.target.value: ',
      event.target.value,
    )

    // to show up in the search results again
    setRemovedOwnersIds([...removedOwnersIds, event.target.value])

    axios
      .put(
        `${BACKEND_URL}/companies/${companyId}/remove-owner/${event.target.value}`,
      )
      .then((response) => {
        console.log(
          'handleRemoveUserAsCompanyOwner response.data: ',
          response.data,
        )
        console.log(
          'handleRemoveUserAsCompanyOwner response.data.owners: ',
          response.data.owners,
        )

        const userIds = []
        response.data.owners.forEach((owner) => {
          userIds.push(owner.userId)
        })

        const ownerPromises = userIds.map((ownerUserId) =>
          axios.get(`${BACKEND_URL}/users/user/${ownerUserId}`),
        )

        Promise.all(ownerPromises)
          .then((responses) => {
            const ownersData = responses.map(
              (ownerResponse) => ownerResponse.data,
            )
            console.log(
              'ownersData in removeUserAsOwner function: ',
              ownersData,
            )
            // tate
            setOwners(ownersData)

            //  Set removed owners to show up in the search results again
            setRemovedOwnersIds([...removedOwnersIds, event.target.value])
          })
          .catch((error) => {
            enqueueSnackbar('Error removing user as owner', {
              variant: 'error',
              preventDuplicate: true,
            })

            // Reset removed owners ids to before Promise
            const removedOwnersIdsFallback = [...removedOwnersIds].filter(
              // If the removed owner id is not equal to the removed owner id that was just removed
              (removedOwnerId) => removedOwnerId !== event.target.value,
            )

            //  Update the removed owners ids state
            setRemovedOwnersIds(removedOwnersIdsFallback)

            console.log(error)
          })
      })
  }

  return (
    <Layout>
      <div className='p-4'>
        <h1 className='flex justify-center text-3xl my-4 mb-6'>
          Edit{' '}
          <div>
            <strong className='ml-2'> {name}</strong>
          </div>
        </h1>
        {loading ? <Loader /> : ''}

        <div className='flex flex-col border-2 border-purple-900 bg-violet-950/40 rounded-xl w-[600px] py-4 px-8 mx-auto mb-4'>
          <div className='my-4'>
            <div className='mb-4'>
              <label className='text-xl mr-4' htmlFor='owners-list'>
                Owners
              </label>
            </div>
            <ul className='mb-4' id='owners-list'>
              {owners.map((owner) => (
                <div
                  className='mb-4 flex justify-between items-center'
                  //
                  key={owner._id}
                >
                  <div>
                    <li>
                      <ul>
                        <li>
                          <VscMention className='inline' />
                          {/*  */}
                          {owner.username}
                        </li>
                        <li>
                          {/*  */}
                          <VscPerson className='inline' /> {owner.firstName}{' '}
                          {/*  */}
                          {owner.lastName}
                        </li>
                        <li>
                          {/*  */}
                          <VscMail className='inline' /> {owner.email}
                        </li>
                      </ul>
                    </li>
                  </div>
                  <div>
                    {/*  */}
                    {owner._id === userId ? (
                      ''
                    ) : (
                      <button
                        className='bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l px-4 py-1 rounded-lg mx-auto mb-4'
                        data-test-id='remove-owner-button'
                        onClick={handleRemoveUserAsCompanyOwner}
                        type='button'
                        value={owner._id}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <UserSearch
            //
            addPendingOwnershipInvite={addPendingOwnershipInvite}
            companyId={companyId}
            setUsersResult={setUsersResult}
            usersResult={usersResult}
          />
        </div>
        {pendingOwnershipInvites.length > 0 ? (
          <div className='flex flex-col border-2 border-purple-900 bg-violet-950/40 rounded-xl w-[600px] py-4 px-8 pl-9 mx-auto mb-4'>
            <div className='my-4'>
              <div className='mb-8'>
                <div className='mb-8'>
                  <label
                    className='text-2xl mr-4'
                    htmlFor='pending-ownership-invites'
                  >
                    Pending Ownership Invites
                  </label>
                </div>
                <ul className='mb-4' id='pending-ownership-invites'>
                  {pendingOwnershipInvites.map((invite) => (
                    <>
                      <div className='float-left mt-2 mr-2'>
                        <img
                          alt='Profile'
                          className='rounded-full h-16 w-16 mr-4'
                          src={
                            invite.receiver.profilePictureURL
                              ? invite.receiver.profilePictureURL
                              : invite.receiver.gender === 'Man'
                              ? `${BACKEND_URL}/placeholders/profile-picture-placeholder-man.jpeg`
                              : `${BACKEND_URL}/placeholders/profile-picture-placeholder-woman.jpeg`
                          }
                        />
                      </div>
                      <div
                        className='mb-4 flex justify-between items-center'
                        key={invite._id}
                      >
                        <div>
                          <li>
                            <ul>
                              <table>
                                <tbody>
                                  <li>
                                    <tr>
                                      <td>
                                        <VscMention className='inline' />
                                      </td>
                                      <td>{invite.receiver.username}</td>
                                    </tr>
                                  </li>
                                  <li>
                                    <tr>
                                      <td>
                                        <VscPerson className='inline' />
                                      </td>
                                      <td>
                                        {invite.receiver.firstName}{' '}
                                        {invite.receiver.lastName}
                                      </td>
                                    </tr>
                                  </li>
                                  <li>
                                    <tr>
                                      <td>
                                        <VscMail className='inline' />
                                      </td>
                                      <td> {invite.receiver.email}</td>
                                    </tr>
                                  </li>
                                </tbody>
                              </table>
                            </ul>
                          </li>
                        </div>
                        <div>
                          <button
                            className='bg-gradient-to-r from-violet-600 to-purple-600 hover:from-red-700 hover:to-red-400 hover:bg-gradient-to-l px-4 py-1 rounded-lg mx-auto mb-4'
                            data-test-id='cancel-invite-button'
                            onClick={handleCancelPendingOwnershipInvite}
                            type='button'
                            value={invite._id}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {/* TODO: [MERNSTACK-194] Make <CompanyRegisterEditForm company={company} /> component and use it in EditCompany.jsx and RegisterCompany.jsx */}
        <div className='flex flex-col border-2 border-purple-900 bg-violet-950/40 rounded-xl w-[600px] py-4 px-8 mx-auto'>
          {/* TODO: [MERNSTACK-130] Add input fields for all editable company details. To achieve this, copy the outer div with class ".my-4". */}
          {/* Comany Name input field */}
          <div className='my-4'>
            <label className='text-xl mr-4' htmlFor='name-input'>
              Name
            </label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                nameError ? 'border-red-500' : ''
              }`}
              data-test-id='name-input'
              id='name-input'
              onBlur={validateCompanyName}
              onChange={handleNameChange}
              type='text'
              value={name}
            />
            {nameError ? (
              <p className='text-red-500 text-sm'>
                Company name must be between 1 and 60 characters long and can
                only contain letters, numbers, spaces, and the following
                characters: -, &apos;, and .
              </p>
            ) : (
              ''
            )}
          </div>
          {/* Company logo */}
          <div className='my-4'>
            <label className='text-xl mr-4' htmlFor='image-preview'>
              Logo
            </label>
            <div className='w-full'>
              <div className='flex justify-center items-center my-4'>
                <div className='flex justify-center' id='image-preview'>
                  {logo ? (
                    <img alt='Preview' height='200' src={logo} width='200' />
                  ) : null}
                </div>
              </div>
              <div className='flex justify-center items-center mb-4 mt-8'>
                <button
                  className='bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l px-4 py-1 rounded-lg'
                  data-test-id='upload-logo-button'
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
          {/* Comany Email input field */}
          <div className='my-4'>
            <label className='text-xl mr-4' htmlFor='company-email-input'>
              Email
            </label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                emailError ? 'border-red-500' : ''
              }`}
              data-test-id='company-email-input'
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
          {/* Comany Phone Number input field */}
          <div className='my-4'>
            <label className='text-xl mr-4' htmlFor='company-phone-input'>
              Phone
            </label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                phoneError ? 'border-red-500' : ''
              }`}
              data-test-id='company-phone-input'
              id='company-phone-input'
              onBlur={validatePhone}
              onChange={handlePhoneChange}
              type='text'
              value={phone}
            />
            {phoneError ? (
              <p className='text-red-500 text-sm'>
                Phone number must be a valid phone number.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4' htmlFor='company-kvk-number-input'>
              KVK number
            </label>
            {TEST_KVK_API ? (
              <div className='mb-4'>
                <p>
                  <strong>Note:</strong> Use KVK numbers from{' '}
                  <a
                    className='text-blue-300'
                    data-test-id='kvk-api-link'
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
              data-test-id='company-kvk-number-input'
              id='company-kvk-number-input'
              onBlur={validateKvkNumber}
              onChange={handleKvkNumberChange}
              type='text'
              value={kvkNumber}
            />
            {kvkNumberError ? (
              <p className='text-red-500 text-sm'>
                {kvkNumberErrorMessage || 'Must be a valid KVK number.'}
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
                startYearError ? 'border-red-500' : ''
              }`}
              data-test-id='company-slogan-input'
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
                startYearError ? 'border-red-500' : ''
              }`}
              data-test-id='company-description-input'
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
              data-test-id='company-start-year-input'
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
            data-test-id='save-edit-company-button'
            onClick={handleEditCompany}
            type='button'
          >
            Save
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default EditCompany

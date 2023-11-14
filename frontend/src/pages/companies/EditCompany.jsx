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
  // ADD OWNERS TO COMPANY TICKETS:
  // TODO: [MERNSTACK-129] Add state for all companies fields that can be edited

  // Get the companyId from the URL
  const { id } = useParams()
  const companyId = id

  // @ts-ignore Get the userId from the Redux store
  const userId = useSelector((state) => state.userId)
  // @ts-ignore Get the user from the Redux store
  const user = useSelector((state) => state.user)

  // Input field values for editing a company as state
  const [name, setName] = useState('')
  const [logo, setLogo] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [kvkNumber, setKvkNumber] = useState('')
  const [slogan, setSlogan] = useState('')
  const [description, setDescription] = useState('')
  const [startYear, setStartYear] = useState(0)

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

  // Owners state
  const [owners, setOwners] = useState([])

  // Pending ownership invites state
  const [pendingOwnershipInvites, setPendingOwnershipInvites] = useState([])

  // Search results state for searching users to add as owners
  const [usersResult, setUsersResult] = useState([])

  // Removed owners ids
  const [removedOwnersIds, setRemovedOwnersIds] = useState([])

  // Set showLogoModal to true to show the modal for uploading a company logo
  const [showLogoModal, setShowLogoModal] = useState(false)

  // Display a spinner when loading data from the backend
  const [loading, setLoading] = useState(false)

  // useNavigate is a hook that allows us to navigate to a different page
  const navigate = useNavigate()

  // useSnackbar is a hook that allows us to show a snackbar https://www.npmjs.com/package/notistack https://iamhosseindhv.com/notistack/demos#use-snackbar
  const { enqueueSnackbar } = useSnackbar()

  // useEffect is a hook that runs a function when the component is rendered
  useEffect(() => {
    getPendingOwnershipInvites()
  }, [companyId, userId, user])

  // Validation functions for validating the input fields and put a red border around the input field if the input is invalid
  // and display an error message under the input field explaining the right format
  const validateCompanyName = () => {
    if (!companyNameValidator(name)) {
      setNameError(true)
    } else {
      setNameError(false)
    }
  }
  const validateEmail = () => {
    if (!emailValidator(email)) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }
  const validatePhone = () => {
    if (!phoneNumberValidator(phone, 'NL')) {
      setPhoneError(true)
    } else {
      setPhoneError(false)
    }
  }
  const validateKvkNumber = async () => {
    if (!(await kvkNumberValidator(kvkNumber))) {
      setKvkNumberError(true)
      throw new Error('Invalid KVK number!')
    } else {
      setKvkNumberError(false)
    }
  }
  const validateSlogan = () => {
    if (!companySloganValidator(slogan)) {
      setSloganError(true)
    } else {
      setSloganError(false)
    }
  }
  const validateDescription = () => {
    if (!companyDescriptionValidator(description)) {
      setDescriptionError(true)
    } else {
      setDescriptionError(false)
    }
  }
  const validateStartYear = () => {
    if (!startYearValidator(startYear)) {
      setStartYearError(true)
    } else {
      setStartYearError(false)
    }
  }

  // Handle onChange events for all input fields
  const handleNameChange = (e) => {
    setName(e.target.value)
    if (nameError) {
      validateCompanyName()
    }
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (emailError) {
      validateEmail()
    }
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
    if (phoneError) {
      validatePhone()
    }
  }
  const handleKvkNumberChange = async (e) => {
    setKvkNumber(e.target.value)
    if (kvkNumberError) {
      await validateKvkNumber()
    }
  }
  const handleSloganChange = (e) => {
    setSlogan(e.target.value)
    if (sloganError) {
      validateSlogan()
    }
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
    if (descriptionError) {
      validateDescription()
    }
  }
  const handleStartYearChange = (e) => {
    setStartYear(e.target.value)
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
      .get(BACKEND_URL + '/companies/' + companyId)
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
        const ownerPromises = userIds.map((userId) => {
          return axios.get(BACKEND_URL + '/users/user/' + userId)
        })

        // Resolve all promises to get owners user data
        Promise.all(ownerPromises)
          .then((responses) => {
            const ownersData = responses.map((response) => response.data)
            // @ts-ignore Update the owners state
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

        console.log('ERROR fetching company in useEffect(): ', error) // ! TODO: Remove console.log and write errors to logfile
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
      .put(BACKEND_URL + `/companies/${companyId}`, data)
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

  const getPendingOwnershipInvites = async () => {
    if (!userId || !user || !companyId) {
      return
    }

    // Get all pending ownership invites for the sender
    const pendingInvites = await axios
      .get(`${BACKEND_URL}/invites/company/sender/pending`, {
        headers: {
          // Send the senders' user _id in the headers
          senderid: userId,
          // Send the company id in the headers
          companyid: companyId,
        },
      })
      .catch((error) => {
        // TODO: Handle error, write to file, and show error message to user with react-toastify
        enqueueSnackbar('Error fetching pending ownership invites', {
          variant: 'error',
          preventDuplicate: true,
        })

        console.log('ERROR in getPendingOwnershipInvites: ', error)
      })

    Promise.resolve(pendingInvites).then((response) => {
      // @ts-ignore Set the pending ownership invites state
      setPendingOwnershipInvites(response.data)
    })
  }

  // Add pending ownership invite
  const addPendingOwnershipInvite = async (e) => {
    // Prevent the form from submitting
    e.preventDefault()

    // Get the id of the user to be invited as an owner
    const invitedOwnerId = e.target.value

    console.log('invitedOwnerId: ', invitedOwnerId) // ! TODO: Remove console.log and write errors to logfile

    // Make an API call to invite the user as an owner
    await axios
      .post(BACKEND_URL + '/invites', {
        senderId: userId,
        receiverId: invitedOwnerId,
        companyId,
        kind: 'company_ownership',
        status: 'pending',
      })
      .then((response) => {
        console.log(
          'UserSearch.jsx response.data invite ownership: ',
          response.data,
        ) // ! TODO: Remove console.log and write errors to logfile

        // Filter the invited owner from the search results
        const newUsersResult = usersResult.filter(
          // @ts-ignore
          (user) => user._id !== invitedOwnerId,
        )
        // @ts-ignore  Update the search results
        setUsersResult(newUsersResult)

        // @ts-ignore Add the pending ownership invite to the pending ownership invites state
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
        ) // ! TODO: Remove console.log and write errors to logfile
      })
  }

  // useEffect is a hook that runs a function when the component is rendered
  useEffect(() => {}, [pendingOwnershipInvites])

  const handleCancelPendingOwnershipInvite = (e) => {
    // Prevent the form from submitting
    e.preventDefault()

    // Get the id of the pending ownership invite to be canceled
    const inviteId = e.target.value

    console.log(
      'handleCancelPendingOwnershipInvite pendingOwnershipInviteId: ',
      inviteId,
    ) // ! TODO: Remove console.log

    // Make an API call to cancel the pending ownership invite
    axios
      .put(`${BACKEND_URL}/invites/status/${inviteId}`, {
        status: 'canceled',
      })
      .then((response) => {
        console.log(
          'handleCancelPendingOwnershipInvite response.data: ',
          response.data,
        ) // ! TODO: Remove console.log

        // Remove the canceled pending ownership invite from the pending ownership invites state
        const newPendingOwnershipInvites = pendingOwnershipInvites.filter(
          // @ts-ignore
          (invite) => invite._id !== inviteId,
        )

        // @ts-ignore Update the pending ownership invites state
        setPendingOwnershipInvites(
          // @ts-ignore
          newPendingOwnershipInvites || [],
        )

        store.dispatch({
          type: PENDING_RECIEVED_INVITES,
          payload: newPendingOwnershipInvites || [],
        })

        // Add the user that was removed as an invited owner back to the search results
        console.log('Users result before adding user back: ', usersResult)

        // @ts-ignore Update the search results and filter out the user that was removed to be an invited owner
        setUsersResult(
          usersResult.filter(
            // @ts-ignore
            (user) => user._id !== response.data.receiverId,
          ),
        )
      })
      .catch((error) => {
        enqueueSnackbar('Error canceling pending ownership invite', {
          variant: 'error',
          preventDuplicate: true,
        })
        console.log('ERROR in handleCancelPendingOwnershipInvite: ', error) // ! TODO: Remove console.log and write errors to logfile
      })
  }

  const handleRemoveUserAsCompanyOwner = (e) => {
    console.log(
      'handleRemoveUserAsCompanyOwner e.target.value: ',
      e.target.value,
    ) // ! TODO: Remove console.log

    // @ts-ignore Set removed owners to show up in the search results again
    setRemovedOwnersIds([...removedOwnersIds, e.target.value])

    axios
      .put(
        BACKEND_URL +
          '/companies/' +
          companyId +
          '/remove-owner/' +
          e.target.value,
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

        const ownerPromises = userIds.map((userId) =>
          axios.get(BACKEND_URL + '/users/user/' + userId),
        )

        Promise.all(ownerPromises)
          .then((responses) => {
            const ownersData = responses.map((response) => response.data)
            console.log(
              'ownersData in removeUserAsOwner function: ',
              ownersData,
            )
            // @ts-ignore Update the owners state
            setOwners(ownersData)

            // @ts-ignore Set removed owners to show up in the search results again
            setRemovedOwnersIds([...removedOwnersIds, e.target.value])
          })
          .catch((error) => {
            enqueueSnackbar('Error removing user as owner', {
              variant: 'error',
              preventDuplicate: true,
            })

            // Reset removed owners ids to before Promise
            const removedOwnersIdsFallback = [...removedOwnersIds].filter(
              // If the removed owner id is not equal to the removed owner id that was just removed
              (removedOwnerId) => removedOwnerId !== e.target.value,
            )

            // @ts-ignore Update the removed owners ids state
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
              <label className='text-xl mr-4'>Owners</label>
            </div>
            <ul className='mb-4'>
              {owners.map((owner, index) => {
                return (
                  <div
                    className='mb-4 flex justify-between items-center'
                    // @ts-ignore
                    key={owner._id + index}
                  >
                    <div>
                      <li>
                        <ul>
                          <li>
                            <VscMention className='inline' />
                            {/* @ts-ignore */}
                            {owner.username}
                          </li>
                          <li>
                            {/* @ts-ignore */}
                            <VscPerson className='inline' /> {owner.firstName}{' '}
                            {/* @ts-ignore */}
                            {owner.lastName}
                          </li>
                          <li>
                            {/* @ts-ignore */}
                            <VscMail className='inline' /> {owner.email}
                          </li>
                        </ul>
                      </li>
                    </div>
                    <div>
                      {/* @ts-ignore */}
                      {owner._id !== userId ? (
                        <button
                          data-test-id='remove-owner-button'
                          onClick={handleRemoveUserAsCompanyOwner}
                          className='bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l px-4 py-1 rounded-lg mx-auto mb-4'
                          // @ts-ignore
                          value={owner._id}
                        >
                          Remove
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                )
              })}
            </ul>
          </div>
          <UserSearch
            // @ts-ignore
            addPendingOwnershipInvite={addPendingOwnershipInvite}
            companyId={companyId}
            setUsersResult={setUsersResult}
            usersResult={usersResult}
          />
        </div>
        {pendingOwnershipInvites.length > 0 ? (
          <div className='flex flex-col border-2 border-purple-900 bg-violet-950/40 rounded-xl w-[600px] py-4 px-8 mx-auto mb-4'>
            <div className='my-4'>
              <div className='mb-8'>
                <div className='mb-8'>
                  <label className='text-2xl mr-4'>
                    Pending Ownership Invites
                  </label>
                </div>
                <ul className='mb-4'>
                  {pendingOwnershipInvites.map((invite, index) => {
                    return (
                      <div
                        className='mb-4 flex justify-between items-center'
                        // @ts-ignore
                        key={invite._id + index}
                      >
                        <div>
                          <li>
                            <ul>
                              <li>
                                <VscMention className='inline' />
                                {/* @ts-ignore */}
                                INVITE ID: {invite._id}
                              </li>
                              <li>
                                <VscPerson className='inline' /> RECIEVER ID:
                                {/* @ts-ignore */}
                                {invite.receiverId}
                              </li>
                              <li>
                                <VscMail className='inline' /> SENDER ID:{' '}
                                {/* @ts-ignore */}
                                {invite.senderId}
                              </li>
                            </ul>
                          </li>
                        </div>
                        <div>
                          <button
                            data-test-id='cancel-invite-button'
                            onClick={handleCancelPendingOwnershipInvite}
                            className='bg-gradient-to-r from-violet-600 to-purple-600 hover:from-red-700 hover:to-red-400 hover:bg-gradient-to-l px-4 py-1 rounded-lg mx-auto mb-4'
                            // @ts-ignore
                            value={invite._id}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )
                  })}
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
            <label className='text-xl mr-4'>Name</label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                nameError ? 'border-red-500' : ''
              }`}
              data-test-id='name-input'
              onBlur={validateCompanyName}
              onChange={handleNameChange}
              type='text'
              value={name}
            />
            {nameError ? (
              <p className='text-red-500 text-sm'>
                Company name must be between 1 and 60 characters long and can
                only contain letters, numbers, spaces, and the following
                characters: -, ', and .
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
            <label className='text-xl mr-4'>Email</label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                emailError ? 'border-red-500' : ''
              }`}
              data-test-id='company-email-input'
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
            <label className='text-xl mr-4'>Phone</label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                phoneError ? 'border-red-500' : ''
              }`}
              data-test-id='company-phone-input'
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
            <label className='text-xl mr-4'>KVK number</label>
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
            <label className='text-xl mr-4'>Slogan</label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                startYearError ? 'border-red-500' : ''
              }`}
              data-test-id='company-slogan-input'
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
            <label className='text-xl mr-4'>Company Description</label>
            <textarea
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                startYearError ? 'border-red-500' : ''
              }`}
              data-test-id='company-description-input'
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
            <label className='text-xl mr-4'>Start Year</label>
            <input
              className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
                startYearError ? 'border-red-500' : ''
              }`}
              data-test-id='company-start-year-input'
              onBlur={validateStartYear}
              onChange={handleStartYearChange}
              type='number'
              value={startYear}
            />
            {startYearError ? (
              <p className='text-red-500 text-sm'>
                Start year must be a valid year and never can be later then the
                current year. If company hasn't started yet, register company
                when it starts.
              </p>
            ) : (
              ''
            )}
          </div>
          <button
            className='bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l rounded-lg p-2 m-8'
            data-test-id='save-edit-company-button'
            onClick={handleEditCompany}
          >
            Save
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default EditCompany

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
import EditCompanyLogoModal from '../../components/companies/EditCompanyLogoModal'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/animated/Loader.jsx'

const EditCompany = () => {
  // Get the companyId from the URL
  const { id } = useParams()
  const companyId = id
  const userId = useSelector((state) => state.userId)
  const user = useSelector((state) => state.user)
  // Input field values for editing a company as state
  const [name, setName] = useState('')
  const [logoId, setLogoId] = useState('')
  const [logoPreview, setLogoPreview] = useState('')
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
        setLogoId(response.data.logoId)
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
      logoId,
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

  // Get owners from company and update state
  const updateCompanyOwners = async () => {
    // Get owners from company
    const companyData = await axios.get(`${BACKEND_URL}/companies/${companyId}`)
    const userIds = []
    companyData.data.owners.forEach((owner) => {
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

        console.log('DELETE THIS OWNERS DATA: ', ownersData)

        setOwners(ownersData)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Update pending ownership invites every 5 seconds
  useEffect(() => {
    // Set interval
    const interval = setInterval(() => {
      getCompanyPendingOwnershipInvites()
      updateCompanyOwners()
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
          Edit{' '}
          <div>
            <strong className='ml-2'> {name}</strong>
          </div>
        </h1>
        {loading ? <Loader /> : ''}

        <div className='mx-auto mb-4 flex w-[600px] flex-col rounded-xl border-2 border-purple-900 bg-violet-950/40 px-8 py-4'>
          <div className='my-4'>
            <div className='mb-4'>
              <label className='mr-4 text-xl' htmlFor='owners-list'>
                Owners
              </label>
            </div>
            <ul className='mb-4' id='owners-list'>
              {owners.map((owner) => (
                <>
                  <div className='float-left mr-2 mt-3'>
                    <img
                      alt='Profile'
                      className='mr-4 h-16 w-16 rounded-full'
                      src={
                        owner.profilePictureURL
                          ? owner.profilePictureURL
                          : owner.gender === 'Man'
                          ? `${BACKEND_URL}/placeholders/profile-picture-placeholder-man.jpeg`
                          : `${BACKEND_URL}/placeholders/profile-picture-placeholder-woman.jpeg`
                      }
                    />
                  </div>
                  <div
                    className='mb-4 flex items-center justify-between'
                    //
                    key={owner._id}
                  >
                    <div>
                      <table>
                        <tbody>
                          <li>
                            <tr>
                              <td>
                                <VscMention className='inline' />
                              </td>
                              <td>{owner.username}</td>
                            </tr>
                          </li>
                          <li>
                            <tr>
                              <td>
                                <VscPerson className='inline' />
                              </td>
                              <td>
                                {owner.firstName} {owner.lastName}
                              </td>
                            </tr>
                          </li>
                          <li>
                            <tr>
                              <td>
                                <VscMail className='inline' />
                              </td>
                              <td>{owner.email}</td>
                            </tr>
                          </li>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      {/*  */}
                      {owner._id === userId ? (
                        ''
                      ) : (
                        <button
                          className='mx-auto mb-4 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1 hover:bg-purple-700 hover:bg-gradient-to-l'
                          data-testid='remove-owner-button'
                          onClick={handleRemoveUserAsCompanyOwner}
                          type='button'
                          value={owner._id}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ))}
            </ul>
          </div>
          <UserSearch
            //
            addPendingOwnershipInvite={addPendingOwnershipInvite}
            companyId={companyId}
            pendingOwnershipInvites={pendingOwnershipInvites}
            setUsersResult={setUsersResult}
            usersResult={usersResult}
          />
        </div>
        {pendingOwnershipInvites.length > 0 ? (
          <div className='mx-auto mb-4 flex w-[600px] flex-col rounded-xl border-2 border-purple-900 bg-violet-950/40 px-8 py-4 pl-9'>
            <div className='my-4'>
              <div className='mb-8'>
                <div className='mb-8'>
                  <label
                    className='mr-4 text-2xl'
                    htmlFor='pending-ownership-invites'
                  >
                    Pending Ownership Invites
                  </label>
                </div>
                <ul className='mb-4' id='pending-ownership-invites'>
                  {pendingOwnershipInvites.map((invite) => (
                    <>
                      <div className='float-left mr-2 mt-2'>
                        <img
                          alt='Profile'
                          className='mr-4 h-16 w-16 rounded-full'
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
                        className='mb-4 flex items-center justify-between'
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
                            className='mx-auto mb-4 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1 hover:bg-gradient-to-l hover:from-red-700 hover:to-red-400'
                            data-testid='cancel-invite-button'
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
        <div className='mx-auto flex w-[600px] flex-col rounded-xl border-2 border-purple-900 bg-violet-950/40 px-8 py-4'>
          {/* TODO: [MERNSTACK-130] Add input fields for all editable company details. To achieve this, copy the outer div with class ".my-4". */}
          {/* Comany Name input field */}
          <div className='my-4'>
            <label className='mr-4 text-xl' htmlFor='name-input'>
              Name
            </label>
            <input
              className={`w-full rounded-xl border-2 border-purple-900 bg-cyan-100 px-4 py-2 text-gray-800 focus:bg-white ${
                nameError ? 'border-red-500' : ''
              }`}
              data-testid='name-input'
              id='name-input'
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
            <label className='mr-4 text-xl' htmlFor='image-preview'>
              Logo
            </label>
            <div className='w-full'>
              <div className='my-4 flex items-center justify-center'>
                <div className='flex justify-center' id='image-preview'>
                  {logoPreview ? (
                    <img
                      alt='Preview'
                      className='rounded-full'
                      height='200'
                      src={logoPreview}
                      width='200'
                    />
                  ) : null}
                </div>
              </div>
              <div className='mb-4 mt-8 flex items-center justify-center'>
                <button
                  className='rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1 hover:bg-purple-700 hover:bg-gradient-to-l'
                  data-testid='upload-logo-button'
                  onClick={() => setShowLogoModal(true)}
                  type='button'
                >
                  Upload Logo
                </button>
              </div>
              {showLogoModal ? (
                <EditCompanyLogoModal
                  onClose={() => {
                    setShowLogoModal(false)
                  }}
                  setLogoId={setLogoId}
                />
              ) : null}
            </div>
          </div>
          {/* Comany Email input field */}
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
          {/* Comany Phone Number input field */}
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
            {phoneError ? (
              <p className='text-sm text-red-500'>
                Phone number must be a valid phone number.
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='my-4'>
            <label className='mr-4 text-xl' htmlFor='company-kvk-number-input'>
              KVK number
            </label>
            {TEST_KVK_API ? (
              <div className='mb-4'>
                <p>
                  <strong>Note:</strong> Use KVK numbers from{' '}
                  <a
                    className='text-blue-300'
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
                {kvkNumberErrorMessage || 'Must be a valid KVK number.'}
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
                startYearError ? 'border-red-500' : ''
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
                startYearError ? 'border-red-500' : ''
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
            data-testid='save-edit-company-button'
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

import axios from 'axios'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BACKEND_URL } from '../../config'
import { VscMail, VscMention, VscPerson } from 'react-icons/vsc'
import { AiOutlineWoman, AiOutlineMan } from 'react-icons/ai'
import { enqueueSnackbar } from 'notistack'

const UserSearch = ({
  companyId,
  addPendingOwnershipInvite,
  usersResult,
  setUsersResult,
  pendingOwnershipInvites,
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const searchUsers = (query) => {
    axios
      .get(`${BACKEND_URL}/users/search/${query}`, {
        headers: {
          companyid: companyId,
        },
      })
      .then((response) => {
        // filter out users that are already invited
        const filteredUsers = response.data.filter((resultUser) => {
          // check if the user is already invited by using find() on the pendingOwnershipInvites array
          // find() iterates over the array and returns the first element that matches the condition
          const isInvited = pendingOwnershipInvites.find(
            // compare the user id of the pending ownership invite with the id of the user in the search results
            (invite) => invite.receiverId === resultUser._id,
          )

          // if the user is already invited, return false, otherwise return true
          return !isInvited
        })

        setUsersResult(filteredUsers)
        // setUsersResult(response.data) // DELETE THIS ONE
      })
      .catch((error) => {
        if (error.status === 404) {
          return
        }
        enqueueSnackbar('Error searching for users', {
          variant: 'error',
          preventDuplicate: true,
        })

        // ! TODO: Handle error in UI
        console.log(
          'ERROR in UserSearch.jsx get search results API call: ',
          error,
        )
      })
  }

  const handleSearch = (event) => {
    // if the search input is empty, clear the search results
    if (event.target.value === '') {
      setSearchTerm('')
      setUsersResult([])
      return
    }

    setSearchTerm(event.target.value)
    searchUsers(event.target.value)

    console.log(
      'handleSearch e.target.value in UserSearch.jsx: ',
      event.target.value,
    )
  }

  return (
    <div>
      <div className='my-4'>
        <label className='text-xl mr-4' htmlFor='searchInput'>
          Search user to add as company owner:
        </label>
        <div className='my-4'>
          <p className='text-gray-300'>
            <strong>Note:</strong> Register more accounts if you want results,
            search query will match on username, first name, last name and
            email.
          </p>
        </div>

        <input
          className='border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full'
          data-testid='search-input'
          id='searchInput'
          onChange={handleSearch}
          type='text'
          value={searchTerm}
        />
      </div>
      <ul>
        {usersResult.map((userResult) => (
          <>
            <div className='float-left mt-3 mr-2'>
              <img
                alt='Profile'
                className='rounded-full h-16 w-16 mr-4'
                src={
                  userResult.profilePictureURL
                    ? userResult.profilePictureURL
                    : userResult.gender === 'Man'
                    ? `${BACKEND_URL}/placeholders/profile-picture-placeholder-man.jpeg`
                    : `${BACKEND_URL}/placeholders/profile-picture-placeholder-woman.jpeg`
                }
              />
            </div>
            <div
              className='search-result flex border-sky-400 rounded-xl mx-auto justify-between items-center'
              key={userResult._id}
            >
              <div className='mb-4'>
                <table>
                  <tbody>
                    <li>
                      <tr>
                        <td>
                          <VscMention className='inline' />
                        </td>
                        <td>{userResult.username}</td>
                      </tr>
                      <tr>
                        <td>
                          <VscPerson className='inline' />
                        </td>
                        <td>
                          {userResult.firstName} {userResult.lastName}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <VscMail className='inline' />
                        </td>
                        <td>{userResult.email}</td>
                      </tr>
                      <tr>
                        <td>
                          {userResult.gender === 'Woman' ? (
                            <AiOutlineWoman className='inline' />
                          ) : (
                            <AiOutlineMan className='inline' />
                          )}
                        </td>
                        <td>{userResult.gender}</td>
                      </tr>
                    </li>
                  </tbody>
                </table>
              </div>
              <div>
                <button
                  className='bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l px-4 py-1 rounded-lg mx-auto mb-4'
                  data-testid='invite-owner-button'
                  onClick={addPendingOwnershipInvite}
                  type='button'
                  value={userResult._id}
                >
                  Invite
                </button>
              </div>
            </div>
          </>
        ))}
      </ul>
    </div>
  )
}

// Validate prop types
UserSearch.propTypes = {
  // `addPendingOwnershipInvite` is a function that adds a pending ownership invite to the company.
  addPendingOwnershipInvite: PropTypes.func.isRequired,
  // `companyId` is the id of the company.
  companyId: PropTypes.string.isRequired,
  // `pendingOwnershipInvites` is an array of pending ownership invites.
  pendingOwnershipInvites: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      senderId: PropTypes.string.isRequired,
      sender: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        profilePicture: PropTypes.string,
        profilePictureURL: PropTypes.string,
        pendingInvitesCount: PropTypes.number.isRequired,
      }),
      receiverId: PropTypes.string.isRequired,
      receiver: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        profilePicture: PropTypes.string,
        profilePictureURL: PropTypes.string,
        pendingInvitesCount: PropTypes.number,
      }),
      companyId: PropTypes.string.isRequired,
      company: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        slogan: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        kvkNumber: PropTypes.string.isRequired,
        startYear: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
      }),
      status: PropTypes.string.isRequired,
      kind: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  // `setUsersResult` is a function that sets the usersResult state.
  setUsersResult: PropTypes.func.isRequired,
  // `usersResult` is an array of users.
  usersResult: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
      profilePictureURL: PropTypes.string.isRequired,
      pendingInvitesCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default UserSearch

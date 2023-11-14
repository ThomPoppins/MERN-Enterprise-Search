import axios from 'axios'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BACKEND_URL } from '../../config'
import { VscMail, VscMention, VscPerson } from 'react-icons/vsc'
import { enqueueSnackbar } from 'notistack'

const UserSearch = ({
  companyId,
  addPendingOwnershipInvite,
  usersResult,
  setUsersResult,
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
        setUsersResult(response.data)
        // console.log(response.data); //! TODO: Remove console.log and write errors to logfile
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
          data-test-id='search-input'
          id='searchInput'
          onChange={handleSearch}
          type='text'
          value={searchTerm}
        />
      </div>
      <ul>
        {usersResult.map((userResult) => (
          <div
            className='search-result flex border-sky-400 rounded-xl mx-auto justify-between items-center'
            key={userResult._id}
          >
            <div className='mb-4'>
              <li>
                <VscMention className='inline' />
                {userResult.username} <br />
                <VscPerson className='inline' /> {userResult.firstName}{' '}
                {userResult.lastName} <br />
                <VscMail className='inline' /> {userResult.email}
              </li>
            </div>
            <div>
              <button
                className='bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l px-4 py-1 rounded-lg mx-auto mb-4'
                data-test-id='invite-owner-button'
                onClick={addPendingOwnershipInvite}
                type='button'
                value={userResult._id}
              >
                Invite
              </button>
            </div>
          </div>
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
  // `setUsersResult` is a function that sets the usersResult state.
  setUsersResult: PropTypes.func.isRequired,
  // `userResult` is an array of users that match the search term.
  userResult: PropTypes.array,
  // `usersResult` is an array of users that match the search term.
  usersResult: PropTypes.array.isRequired,
}

export default UserSearch

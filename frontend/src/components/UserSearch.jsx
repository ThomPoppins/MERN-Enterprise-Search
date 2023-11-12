import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BACKEND_URL } from '../../config';
import { VscMention, VscPerson, VscMail } from 'react-icons/vsc';
import { enqueueSnackbar } from 'notistack';

const UserSearch = ({ companyId, addPendingOwnershipInvite, usersResult, setUsersResult }) => {
  const [searchTerm, setSearchTerm] = useState(''),
    handleSearch = (e) => {
      // if the search input is empty, clear the search results
      if (e.target.value === '') {
        setSearchTerm('');
        setUsersResult([]);
        return;
      }

      setSearchTerm(e.target.value);
      searchUsers(e.target.value);

      console.log('handleSearch e.target.value in UserSearch.jsx: ', e.target.value);
    },
    searchUsers = (searchTerm) => {
      axios
        .get(BACKEND_URL + '/users/search/' + searchTerm, {
          headers: {
            companyid: companyId,
          },
        })
        .then((response) => {
          setUsersResult(response.data);
          // console.log(response.data); //! TODO: Remove console.log and write errors to logfile
        })
        .catch((error) => {
          if (error.status === 404) {
            return;
          }
          enqueueSnackbar('Error searching for users', {
            variant: 'error',
            preventDuplicate: true,
          });

          // ! TODO: Handle error in UI
          console.log('ERROR in UserSearch.jsx get search results API call: ', error);
        });
    };

  return (
    <div>
      <div className='my-4'>
        <label htmlFor='searchInput' className='text-xl mr-4'>
          Search user to add as company owner:
        </label>
        <div className='my-4'>
          <p className='text-gray-300'>
            <strong>Note:</strong> Register more accounts if you want results, search query will
            match on username, first name, last name and email.
          </p>
        </div>

        <input
          id='searchInput'
          type='text'
          value={searchTerm}
          onChange={handleSearch}
          className='border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full'
          data-test-id='search-input'
        />
      </div>
      <ul>
        {usersResult.map((userResult, index) => (
          <div
            key={userResult._id + index}
            className='search-result flex border-sky-400 rounded-xl mx-auto justify-between items-center'
          >
            <div className='mb-4'>
              <li>
                <VscMention className='inline' />
                {userResult.username} <br />
                <VscPerson className='inline' /> {userResult.firstName} {userResult.lastName} <br />
                <VscMail className='inline' /> {userResult.email}
              </li>
            </div>
            <div>
              <button
                className='bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l px-4 py-1 rounded-lg mx-auto mb-4'
                value={userResult._id}
                onClick={addPendingOwnershipInvite}
                data-test-id='invite-owner-button'
              >
                Invite
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

// Validate prop types
UserSearch.propTypes = {
  // `companyId` is the id of the company.
  companyId: PropTypes.string.isRequired,
  // `addPendingOwnershipInvite` is a function that adds a pending ownership invite to the company.
  addPendingOwnershipInvite: PropTypes.func.isRequired,
  // `usersResult` is an array of users that match the search term.
  usersResult: PropTypes.array.isRequired,
  // `setUsersResult` is a function that sets the usersResult state.
  setUsersResult: PropTypes.func.isRequired,
  // `userResult` is an array of users that match the search term.
  userResult: PropTypes.array,
};

export default UserSearch;

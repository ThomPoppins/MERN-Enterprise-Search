import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { useSelector } from 'react-redux'

import Layout from '../../components/layout/Layout'
import EditProfilePictureModal from '../../components/users/EditProfilePictureModal'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const FEMALE_PROFILE_PICTURE_PLACEHOLDER_URL = import.meta.env
  .VITE_FEMALE_PROFILE_PICTURE_PLACEHOLDER_URL

const MALE_PROFILE_PICTURE_PLACEHOLDER_URL = import.meta.env
  .VITE_MALE_PROFILE_PICTURE_PLACEHOLDER_URL

const UserProfile = () => {
  //  userId is a string from the Redux store state
  const { user } = useSelector((state) => state)

  // Placeholder for profile picture dependent on gender
  const [profilePicturePlaceholderURL, setProfilePicturePlaceholderURL] =
    useState('')
  // State for showing the edit profile picture modal
  const [showEditProfilePictureModal, setShowEditProfilePictureModal] =
    useState(false)

  // Handle the edit profile picture button click event
  const handleEditProfilePicture = () => {
    setShowEditProfilePictureModal(true)
  }

  // When the user is available from the Redux store, set the profile picture placeholder URL
  useEffect(() => {
    if (!user) {
      return
    }

    // Set placeholder image for when the user hasn't uploaded a profile picture yet
    if (user.gender === 'Woman') {
      // Female placeholder image
      setProfilePicturePlaceholderURL(
        `${BACKEND_URL}${FEMALE_PROFILE_PICTURE_PLACEHOLDER_URL}`,
      )
    } else {
      // Male placeholder image
      setProfilePicturePlaceholderURL(
        `${BACKEND_URL}${MALE_PROFILE_PICTURE_PLACEHOLDER_URL}`,
      )
    }
  }, [user])

  return (
    <Layout>
      <div className='mx-auto p-5'>
        <div className='relative mx-auto w-[320px]'>
          <img
            alt='profile'
            className='mx-auto mt-2 h-64 w-64 rounded-full object-cover'
            src={
              user?.profilePictureURL
                ? `${BACKEND_URL}${user?.profilePictureURL}`
                : profilePicturePlaceholderURL
            }
          />
          <button
            className='absolute bottom-3 right-6 flex cursor-pointer items-center rounded-lg border-2 border-purple-900 bg-purple-600 pl-1 pr-2 hover:bg-purple-700'
            data-testid='edit-profile-picture-button'
            onClick={handleEditProfilePicture}
            type='button'
          >
            <BiPencil className='text-gray float-left mr-1' />
            {user?.profilePictureURL ? 'Edit' : 'Upload'}
          </button>
        </div>

        <div className='bg-violet-950/40 mx-auto mt-6 rounded-xl border border-purple-900 p-4 lg:w-9/12'>
          <h1 className='my-2 text-3xl'>
            {user?.firstName} {user?.lastName}
          </h1>

          <p className='text-sm text-blue-400'>
            {user ? `@${user?.username}` : ''}
          </p>

          <div className='mx-auto mb-3 mt-4'>
            {!user?.profilePictureURL && (
              <div className='my-8 flex space-x-2 text-xl'>
                <p>
                  You haven&apos;t set a profile picture yet!{' '}
                  <button
                    className='cursor-pointer text-blue-400 hover:text-green-400'
                    data-testid='upload-profile-picture-button'
                    onClick={handleEditProfilePicture}
                    type='button'
                  >
                    Upload yours now!
                  </button>
                </p>
              </div>
            )}

            <table>
              <thead>
                <tr>
                  <th className='pb-2 text-left text-2xl' colSpan='2'>
                    About Me:
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className='text-gray-400'>Email </span>
                  </td>
                  <td>
                    <span>{user?.email}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='text-gray-400'>Gender </span>
                  </td>
                  <td>
                    <span>{user?.gender}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className=''>
              Visit the Companies link in the navigation bar to see some of this
              this application&apos;s features in action.
            </p>
          </div>
        </div>
      </div>
      {showEditProfilePictureModal ? (
        <EditProfilePictureModal
          onClose={() => setShowEditProfilePictureModal(false)}
        />
      ) : null}{' '}
    </Layout>
  )
}

export default UserProfile

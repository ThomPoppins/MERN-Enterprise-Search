import {
  BACKEND_URL,
  FEMALE_PROFILE_PICTURE_PLACEHOLDER_URL,
  MALE_PROFILE_PICTURE_PLACEHOLDER_URL,
} from '../../../config'
import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import EditProfilePictureModal from '../../components/users/EditProfilePictureModal'
import Layout from '../../components/layout/Layout'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  // @ts-ignore userId is a string from the Redux store state
  const { userId, user } = useSelector((state) => state)
  // Placeholder for profile picture dependent on gender
  const [profilePicturePlaceholderURL, setProfilePicturePlaceholderURL] = useState('')
  // State for showing the edit profile picture modal
  const [showEditProfilePictureModal, setShowEditProfilePictureModal] = useState(false)
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
      setProfilePicturePlaceholderURL(`${BACKEND_URL}${FEMALE_PROFILE_PICTURE_PLACEHOLDER_URL}`)
    } else {
      // Male placeholder image
      setProfilePicturePlaceholderURL(`${BACKEND_URL}${MALE_PROFILE_PICTURE_PLACEHOLDER_URL}`)
    }
  }, [user])

  return (
    <Layout>
      <div className='mx-auto p-5'>
        <div className='relative w-[320px] mx-auto'>
          <img
            alt='profile picture'
            className='w-64 h-64 mt-2 rounded-full mx-auto object-cover'
            src={user?.profilePictureURL ? user?.profilePictureURL : profilePicturePlaceholderURL}
          />
          <div
            className='absolute bottom-3 right-6 bg-purple-600 pl-1 pr-2 flex items-center border-2 border-purple-900 rounded-lg cursor-pointer hover:bg-purple-700'
            data-test-id='edit-profile-picture-button'
            onClick={handleEditProfilePicture}
          >
            <BiPencil className='float-left text-gray mr-1' />
            {user?.profilePictureURL ? 'Edit' : 'Upload'}
          </div>
        </div>

        <div className='mx-auto lg:w-9/12 border border-purple-900 bg-violet-950/40 rounded-xl p-4 mt-6'>
          <h1 className='text-3xl my-2'>
            {user?.firstName} {user?.lastName}
          </h1>

          <p className='text-blue-400 text-sm'>{user ? `@${user?.username}` : ''}</p>

          <div className='mx-auto mt-4 mb-3'>
            {!user?.profilePictureURL && (
              <div className='flex space-x-2 text-xl '>
                <p>
                  You haven&apos;t set a profile picture yet!{' '}
                  <span
                    className='hover:text-green-400 text-blue-400 cursor-pointer'
                    data-test-id='upload-profile-picture-button'
                    onClick={handleEditProfilePicture}
                  >
                    Upload yours now!
                  </span>
                </p>
              </div>
            )}

            <table>
              <thead>
                <tr>
                  <th className='text-gray-400 text-2xl'>About Me</th>
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
              Visit the Companies link in the navigation bar to see some of this this
              application&apos;s features in action.
            </p>
          </div>
        </div>
      </div>
      {showEditProfilePictureModal ? (
        <EditProfilePictureModal
          onClose={() => setShowEditProfilePictureModal(false)}
          userId={userId}
        />
      ) : null}{' '}
    </Layout>
  )
}

export default UserProfile

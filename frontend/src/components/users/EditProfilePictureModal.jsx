import axios from 'axios'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import { BACKEND_URL } from '../../../config'
import store from '../../store/store'

// Modal to edit user profile picture
const EditProfilePictureModal = ({ userId, onClose }) => {
  // The selected file
  const [selectedFile, setSelectedFile] = useState()
  // The preview image of the selected file (Base64 string)
  const [preview, setPreview] = useState('')
  // EnqueueSnackbar is used to show a snackbar notification
  const { enqueueSnackbar } = useSnackbar()

  // Handle file select
  const onSelectFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      //
      setSelectedFile(null)
      return
    }
    // Save the selected file to the selectedFile state
    setSelectedFile(event.target.files[0])
  }

  // Handle the form submit event
  const handleFormSubmit = (event) => {
    // Prevent the default form submit behavior
    event.preventDefault()

    // Create a new FormData object
    const formData = new FormData()

    // Add the image data to the FormData object
    formData.append('image', event.target.image.files[0])

    // Send the image to the server
    axios
      .post(`${BACKEND_URL}/upload/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.data.imageId) {
          // Save the image id of the profile picture to the user's document in the database
          axios
            .put(`${BACKEND_URL}/users/profile-picture`, {
              imageId: response.data.imageId,
              userId,
            })
            // eslint-disable-next-line no-shadow
            .then((response) => {
              // Get the user's updated document from the database and update the user state
              axios
                .get(`${BACKEND_URL}/users/user/${userId}`)
                // eslint-disable-next-line no-shadow
                .then((response) => {
                  const user = response.data
                  store.dispatch({
                    type: 'USER',
                    payload: user,
                  })

                  // Show a snackbar notification
                  enqueueSnackbar('Profile picture updated', {
                    variant: 'success',
                    preventDuplicate: true,
                  })
                })
                .catch((error) => {
                  console.log(
                    'ERROR in EditProfilePictureModal from /users/user/:id: ',
                    error,
                    response,
                  )

                  // Show a snackbar notification
                  enqueueSnackbar('Something went wrong', {
                    variant: 'error',
                    preventDuplicate: true,
                  })
                })
              // Close the modal
              onClose()
            })
            .catch((error) => {
              console.log('ERROR from /users/profile-picture: ', error)

              // Show a snackbar notification
              enqueueSnackbar('Something went wrong', {
                variant: 'error',
                preventDuplicate: true,
              })
            })
        }
      })
      .catch((error) => {
        console.log('ERROR from /upload/image route: ', error)

        // Show a snackbar notification
        enqueueSnackbar('Something went wrong', {
          variant: 'error',
          preventDuplicate: true,
        })
      })
  }

  // Set the preview image
  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return () => {}
    }

    // Convert the selected image to a Base64 string and save it to the preview state
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // Free memory when the preview is closed
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  return (
    <div
      className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/60'
      data-testid='company-modal'
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          onClose()
        }
      }}
      role='button'
      tabIndex={0}
    >
      {/* eslint-disable-next-line */}
      <div
        className='relative m-4 flex h-[510px] w-[600px] max-w-full flex-col rounded-lg border-2 border-purple-900 bg-violet-950/40 px-4 py-4'
        data-testid='company-modal'
        onClick={(event) => event.stopPropagation()}
      >
        <AiOutlineClose
          className='absolute right-6 top-6 cursor-pointer text-3xl text-green-300 hover:text-red-500'
          data-testid='close-button'
          onClick={onClose}
        />
        <h1>Upload Profile Picture</h1>

        <form onSubmit={handleFormSubmit}>
          <input
            data-testid='profile-picture-image-input'
            name='image'
            onChange={onSelectFile}
            type='file'
          />
          {selectedFile ? (
            <img
              alt='Profile'
              className='mx-auto my-4 h-[350px] w-[350px] object-cover'
              src={preview}
            />
          ) : null}
          {!selectedFile && (
            <div className='mx-auto my-4  h-[350px] w-[350px] rounded-lg border-2 border-purple-900'>
              <p className='mt-16 text-center text-2xl text-white'>
                No image selected
              </p>
            </div>
          )}
          <div className='flex justify-center'>
            {selectedFile ? (
              <input
                className='rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 p-2 hover:bg-purple-700 hover:bg-gradient-to-l'
                type='submit'
                value='Upload'
              />
            ) : null}
          </div>
        </form>
      </div>
    </div>
  )
}

EditProfilePictureModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
}

export default EditProfilePictureModal

import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BACKEND_URL } from '../../../config'
import store from '../../store/store.jsx'
import axios from 'axios'

// Modal to edit user profile picture
const EditProfilePictureModal = ({ userId, onClose }) => {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState('')

  // Handle file select
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
  }

  // Set the preview image
  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return
    }
    // Convert the selected image to a Base64 string and save it to the preview state
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // Free memory when the preview is closed
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

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
              userId: userId,
              imageId: response.data.imageId,
            })
            .then((response) => {
              axios
                .get(`${BACKEND_URL}/users/user/${userId}`)
                .then((response) => {
                  console.log('RESPONSE from /users/user/:id: ', response)
                  const user = response.data
                  store.dispatch({
                    type: 'USER',
                    payload: user,
                  })
                })
                .catch((error) => {
                  console.log(
                    'ERROR in EditProfilePictureModal from /users/user/:id: ',
                    error,
                  )
                })

              // Close the modal
              onClose()
            })
            .catch((error) => {
              console.log('ERROR from /users/profile-picture: ', error)
            })
        }
      })
      .catch((error) => {
        console.log('ERROR from /upload/image route: ', error)
      })
  }

  return (
    <div
      className='fixed bg-black/60 top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center'
      data-test-id='company-modal'
      onClick={onClose}
    >
      <div
        className='w-[600px] max-w-full h-[510px] border-2 border-purple-900 bg-violet-950/40 rounded-lg px-4 py-4 m-4 flex flex-col relative'
        data-test-id='company-modal'
        onClick={(event) => event.stopPropagation()}
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-green-300 hover:text-red-500 cursor-pointer'
          data-test-id='close-button'
          onClick={onClose}
        />
        <h1>Upload Profile Picture</h1>

        <form onSubmit={handleFormSubmit}>
          <input
            data-test-id='profile-picture-image-input'
            name='image'
            onChange={onSelectFile}
            type='file'
          />
          {selectedFile ? (
            <img
              alt='Profile Picture'
              className='mx-auto my-4 w-[350px] h-[350px] object-cover'
              src={preview}
            />
          ) : null}
          {!selectedFile && (
            <div className='mx-auto my-4  w-[350px] h-[350px] border-2 border-purple-900 rounded-lg'>
              <p className='text-center text-white text-2xl mt-16'>
                No image selected
              </p>
            </div>
          )}
          <div className='flex justify-center'>
            {selectedFile ? (
              <input
                className='bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l rounded-lg p-2'
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

export default EditProfilePictureModal

import React from 'react'
import Layout from '../components/layout/Layout'
import { useSelector } from 'react-redux'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const UploadImage = () => {
  // Get the user id from the Redux store
  //
  const userId = useSelector((state) => state.userId)

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
        console.log('RESPONSE from /upload/image route: ', response)
        console.log('response.data: ', response.data)

        if (response.data.imageId) {
          // Save the image id of the profile picture to the user's document in the database
          axios
            .put(`${BACKEND_URL}/users/profile-picture`, {
              userId,
              imageId: response.data.imageId,
            })
            .then((response) => {
              console.log('RESPONSE from /users/profile-picture: ', response)
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
    <Layout>
      <h1>UploadImage</h1>

      <form onSubmit={handleFormSubmit}>
        <input data-testid='image-file-upload' name='image' type='file' />
        <input data-testid='image-file-submit' type='submit' value='Submit' />
      </form>
    </Layout>
  )
}

export default UploadImage

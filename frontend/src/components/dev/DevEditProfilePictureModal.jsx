import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AiOutlineClose } from 'react-icons/ai'
import { BACKEND_URL } from '../../../config'
import store from '../../store/store.jsx'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import {
  // eslint-disable-next-line no-unused-vars
  base64StringToFile,
  // eslint-disable-next-line no-unused-vars
  downloadBase64File,
  // eslint-disable-next-line no-unused-vars
  extractImageFileExtensionFromBase64,
  // eslint-disable-next-line no-unused-vars
  image64toCanvasRef,
} from '../../utils/files/images.jsx'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

// Modal to edit user profile picture
const DevEditProfilePictureModal = ({ userId, onClose }) => {
  // The selected file
  const [selectedFile, setSelectedFile] = useState(),
    // The preview image of the selected file (Base64 string)
    [preview, setPreview] = useState(''),
    // Crop state for the ReactCrop component
    [crop, setCrop] = useState({
      aspect: 1 / 1,
      unit: 'px',
      width: 350,
      height: 350,
    }),
    // eslint-disable-next-line no-unused-vars
    imagePreviewCanvasRef = React.createRef(),
    // EnqueueSnackbar is used to show a snackbar notification
    { enqueueSnackbar } = useSnackbar()

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
              .then((userEditProfilePictureResponse) => {
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
                      userEditProfilePictureResponse,
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
    },
    // Handle the crop change event
    handleOnCropChange = (currentCrop) => {
      console.log('crop: ', currentCrop)
      setCrop(currentCrop)
    },
    handleImageLoaded = (image) => {
      console.log('image: ', image)
    },
    // Handle the crop complete event
    handleOnCropComplete = (completeCrop, pixelCrop) => {
      console.log('completeCrop: ', completeCrop)
      console.log('pixelCrop: ', pixelCrop)

      // Get the current canvas element
      const canvasRef = imagePreviewCanvasRef.current

      // Get the image from the objectUrl of the selected file, this is now a Base64 string
      // const imgSrc = selectedFile
      const imgSrc = URL.createObjectURL(selectedFile)

      // Convert the Base64 string to a File object
      image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
      // Create a canvas element
      // const canvas = document.createElement('canvas')
    }

  // Set the preview image
  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return
    }

    // Convert the selected image to a Base64 string and save it to the preview state
    // This created objectUrl is a Base64 string with the metadata part and the image part
    // The two parts are separated by a comma
    const objectUrl = URL.createObjectURL(selectedFile)

    console.log('objectUrl: ', objectUrl)

    // Resize the image to fit withing 350x350px without losing quality
    const image = new Image()
    // Get the image from the objectUrl of the selected file, this is now a Base64 string
    // This is only 1 part of the Base64 string, the other part is the metadata
    // the metadata is ignored by objecturl but you can get the metadata
    image.src = objectUrl

    // When the image is loaded
    image.onload = () => {
      // Create a canvas element
      const canvas = document.createElement('canvas')
      // Get the canvas context
      const ctx = canvas.getContext('2d')
      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0)

      // Resize the image to fit within 350x350px without losing quality
      const MAX_WIDTH = 350
      const MAX_HEIGHT = 350
      let { width } = image
      let { height } = image

      // If the image is too big, resize it
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height
        height = MAX_HEIGHT
      }
      // Set the canvas width and height
      canvas.width = width
      canvas.height = height
      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0, width, height)

      // Convert the canvas to a Base64 string
      const dataurl = canvas.toDataURL('image/png')

      // Save the Base64 string to the preview state
      setPreview(dataurl)
    }

    // Free memory when the preview is closed
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  useEffect(() => {
    // When the selected file is available, set the preview state
    // The return value of URL.createObjectURL is a Base64 string
    if (selectedFile) {
      // Save the Base64 string to the preview state
      setPreview(URL.createObjectURL(selectedFile))
    }

    // Free memory when the preview is closed
    return () => URL.revokeObjectURL(preview)
  }, [selectedFile])

  return (
    <div
      className='fixed bg-black/60 top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center'
      data-test-id='company-modal'
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
            <>
              <ReactCrop
                className='mx-auto my-4 w-[360px] h-[360px] border-2 border-purple-900 rounded-lg'
                crop={crop}
                height='350'
                onChange={handleOnCropChange}
                onComplete={handleOnCropComplete}
                onImageLoaded={handleImageLoaded}
                src={preview}
                width='350'
              />
              <br />
              <p>Preview Canvas Crop</p>
              {/* eslint-disable-next-line react/self-closing-comp */}
              <canvas ref={imagePreviewCanvasRef}></canvas>
            </>
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

DevEditProfilePictureModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
}

export default DevEditProfilePictureModal

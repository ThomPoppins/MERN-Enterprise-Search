/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable id-length */
import React, { useState, useCallback, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { AiOutlineClose } from 'react-icons/ai'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useSelector } from 'react-redux'
import store from '../../store/store'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

/*
 * Function to create a blob from canvas (the crop preview) and download it as png file.
 */
// eslint-disable-next-line func-style
function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return
  }

  // toBlob() is not supported by IE11.
  // toBlob() is a method from the canvas API that converts the canvas image to a blob.
  // A blob is a file-like object of immutable, raw data.
  canvas.toBlob(
    (blob) => {
      // The blob is then converted to a URL using URL.createObjectURL().
      const previewUrl = window.URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.download = 'cropPreview.png'
      // The URL is then used to create a link element with the download attribute.
      anchor.href = URL.createObjectURL(blob)
      // The link element is then clicked to download the file.
      anchor.click()

      // The URL is then revoked to free up memory.
      window.URL.revokeObjectURL(previewUrl)
    },
    'image/png',
    1,
  )
}

/*
 * Function that sets the preview canvas image to the cropped image.

  * The canvas is the preview canvas.
  * The image is the image that is being cropped.
  * The setCanvasImage function is called when the user completes the crop.
  * The (completed) crop is the crop object that contains the crop dimensions (of a completed crop).
  * The (completed) crop object is passed in as a prop to the ReactCrop component.
  * The (completed) crop object is updated when the user completes a change to the crop dimensions.
  * The (completed) crop object is passed in as a prop to the setCanvasImage function.
 */
// eslint-disable-next-line func-style
function setCanvasImage(image, canvas, crop) {
  if (!crop || !canvas || !image) {
    return
  }

  // scaleX and scaleY are used to scale the crop dimensions to the image dimensions.
  // The crop dimensions are in pixels.
  // The image dimensions are in pixels.
  // The image natural dimensions are in pixels.
  // The image natural dimensions are the dimensions of the image before it is scaled.
  // The image dimensions are the dimensions of the image after it is scaled.
  // The image is scaled to fit the ReactCrop component.
  // The image is scaled to fit the ReactCrop component by setting the width and height of the image to 100%
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  // The canvas is scaled to fit the ReactCrop component.
  const ctx = canvas.getContext('2d')

  // The pixelRatio is used to scale the canvas dimensions to the image dimensions.
  // refer https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
  const pixelRatio = window.devicePixelRatio

  // The canvas dimensions are set to the image dimensions.
  // The canvas dimensions are set to the image dimensions by multiplying the image dimensions by the pixelRatio.
  // The canvas dimensions are set to the image dimensions by multiplying the image dimensions by the pixelRatio because the canvas is scaled to fit the ReactCrop component.
  canvas.width = 300
  canvas.height = 300

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality
  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  // The canvas is scaled to fit the ReactCrop component.
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  ctx.imageSmoothingQuality = 'high'

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY,
  )
}

const EditProfilePictureModal = ({ onClose }) => {
  const [upImg, setUpImg] = useState()

  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)

  const { userId } = useSelector((state) => state)

  const [crop, setCrop] = useState({ unit: 'px', width: 30, aspect: 1 })
  const [completedCrop, setCompletedCrop] = useState(null)

  // on selecting file we set load the image on to cropper
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setUpImg(reader.result))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img
  }, [])

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const dataURL = reader.result
        console.log(dataURL)

        setUpImg(dataURL)
      }
      reader.readAsDataURL(file)
    })
  }, [])

  // eslint-disable-next-line no-shadow
  const saveProfileImage = (canvas, completedCrop) => {
    if (!completedCrop || !canvas) {
      console.log(completedCrop)
      return
    }

    canvas.toBlob(
      (blob) => {
        // Create a new FormData object
        const formData = new FormData()

        // Make the blob into a file
        const file = new File([blob], 'profile-picture.png')

        // Add the image data to the FormData object
        formData.append('image', file)

        console.log(formData)

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
                .then(() => {
                  // Get the user's updated document from the database and update the user state
                  axios
                    .get(`${BACKEND_URL}/users/user/${userId}`)
                    // eslint-disable-next-line no-shadow
                    .then((response) => {
                      const userData = response.data

                      console.log('user DATA', userData)

                      // Update the user state
                      store.dispatch({ type: 'USER', payload: userData })
                      onClose()
                    })
                    .catch((error) => {
                      console.log(error)
                    })
                })
                .catch((error) => {
                  console.log(error)
                })
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      'image/png',
      1,
    )
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  useEffect(() => {
    setCanvasImage(imgRef.current, previewCanvasRef.current, completedCrop)
  }, [completedCrop])

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
        className='relative m-4 flex h-auto w-[600px] max-w-full flex-col rounded-lg border-2 border-purple-900 bg-violet-950/40 px-4 py-4'
        data-testid='company-modal'
        onClick={(event) => event.stopPropagation()}
      >
        <AiOutlineClose
          className='absolute right-6 top-6 cursor-pointer text-3xl text-green-300 hover:text-red-500'
          data-testid='close-button'
          onClick={onClose}
        />
        <div>
          <h1>Upload Profile Picture</h1>
        </div>

        {upImg ? (
          <div className='mx-auto mt-12 text-center'>
            <div className=''>
              {/* Canvas to display cropped image */}
              <canvas
                className='rounded-full'
                ref={previewCanvasRef}
                // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                style={{
                  width: '300px',
                  height: '300px',
                  position: 'absolute',
                  top: '50px',
                  right: '-320px',
                  border: '5px solid purple',
                }}
              />
            </div>
            <div className=''>
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                onImageLoaded={onLoad}
                src={upImg}
                style={{
                  width: '300px',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>
            <div>
              <button
                className='rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-700'
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() =>
                  generateDownload(previewCanvasRef.current, completedCrop)
                }
                type='button'
              >
                Download cropped image
              </button>
            </div>

            <div>
              <button
                className='mt-2 rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-700'
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() =>
                  saveProfileImage(previewCanvasRef.current, completedCrop)
                }
                type='button'
              >
                Upload
              </button>
            </div>
          </div>
        ) : null}
        {!upImg && (
          <div
            {...getRootProps({
              className:
                'dropzone mx-auto w-[300px] h-[300px] mt-16 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center',
            })}
          >
            <input
              {...getInputProps({
                accept: 'image/*',
                onChange: onSelectFile,
              })}
            />
            <p>Drag &apos;n&apos; drop image here, or click to select image</p>
          </div>
        )}
      </div>
    </div>
  )
}

EditProfilePictureModal.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default EditProfilePictureModal

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable id-length */
import React, { useState, useCallback, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { AiOutlineClose } from 'react-icons/ai'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { BACKEND_URL } from '../../../config'

// eslint-disable-next-line func-style
function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.download = 'cropPreview.png'
      anchor.href = URL.createObjectURL(blob)
      anchor.click()

      window.URL.revokeObjectURL(previewUrl)
    },
    'image/png',
    1,
  )
}

// eslint-disable-next-line func-style
function setCanvasImage(image, canvas, crop) {
  if (!crop || !canvas || !image) {
    return
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const ctx = canvas.getContext('2d')
  // refer https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
  const pixelRatio = window.devicePixelRatio

  /* eslint-disable no-param-reassign */
  canvas.width = crop.width * pixelRatio * scaleX
  canvas.height = crop.height * pixelRatio * scaleY
  /* eslint-enable no-param-reassign */

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
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

const EditCompanyLogoModal = ({ onClose, setLogoId, setLogoUrl }) => {
  const [upImg, setUpImg] = useState()

  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)

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
      async (blob) => {
        // Create a new FormData object
        const formData = new FormData()

        // Make the blob into a file
        const file = new File([blob], 'company-logo.png')

        // Add the image data to the FormData object
        formData.append('image', file)

        // Send the image to the server
        await axios
          .post(`${BACKEND_URL}/upload/image`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            if (response.data.imageId) {
              // Save the image id of the profile picture to the user's document in the database's
              console.log('RESPOOONSE.DATA IMAGE UPLOAD:', response.data)

              setLogoId(response.data.imageId)
              setLogoUrl(response.data.imageUrl)

              onClose()
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
        className='relative m-4 flex h-[510px] w-[600px] max-w-full flex-col rounded-lg border-2 border-purple-900 bg-violet-950/40 px-4 py-4'
        data-testid='company-modal'
        onClick={(event) => event.stopPropagation()}
      >
        <AiOutlineClose
          className='absolute right-6 top-6 cursor-pointer text-3xl text-green-300 hover:text-red-500'
          data-testid='close-button'
          onClick={onClose}
        />
        <div>
          <h1>Upload Company Logo</h1>
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
                  height: '300px',
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

EditCompanyLogoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  setLogoId: PropTypes.func.isRequired,
  setLogoUrl: PropTypes.func,
}

EditCompanyLogoModal.defaultProps = {
  setLogoUrl: (url) => url,
}

export default EditCompanyLogoModal

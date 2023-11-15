/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

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

  canvas.width = crop.width * pixelRatio * scaleX
  canvas.height = crop.height * pixelRatio * scaleY

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

const ImageCrop = () => {
  // upImg is the image selected in base64 format
  const [upImg, setUpImg] = useState()

  // Is the reference to the image uploaded
  const imgRef = useRef(null)
  // Is the reference to the preview canvas
  const previewCanvasRef = useRef(null)

  // Crop state
  const [crop, setCrop] = useState({ unit: 'px', width: 300, aspect: 1 })
  // Completed crop state
  const [completedCrop, setCompletedCrop] = useState(null)

  // On image upload
  const onDrop = useCallback((acceptedFiles) => {
    console.log('acceptedFiles: ', acceptedFiles)

    acceptedFiles.forEach((file) => {
      // File reader to read the file
      const reader = new FileReader()

      // Read the file as a binary string
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onerror
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onabort
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText

      // .onabort: A handler for the abort event. This event is triggered each time the reading operation is aborted.
      reader.onabort = () => console.log('file reading was aborted')
      // .onerror: A handler for the error event. This event is triggered each time the reading operation encounter an error.
      reader.onerror = () => console.log('file reading has failed')
      // .onload: A handler for the load event. This event is triggered each time the reading operation is successfully completed.
      reader.onload = () => {
        // Binary string of the file contents
        const binaryStr = reader.result

        console.log('binaryStr: ', binaryStr)
      }
      reader.readAsArrayBuffer(file)
    }, [])
  }, [])

  const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop })

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

  useEffect(() => {
    setCanvasImage(imgRef.current, previewCanvasRef.current, completedCrop)
  }, [completedCrop])

  return (
    <div
      {...getRootProps({
        className: 'dropzone bg-purple-500 text-white p-4 rounded-lg mt-4 mx-4',
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  )
}

export default ImageCrop

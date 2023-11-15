/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const ImageCrop = () => {
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

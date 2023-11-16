import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Avatar from 'react-avatar-edit'

const UploadAvatar = ({ setLogo, onClose }) => {
  const [preview, setPreview] = useState(null),
    onCrop = (view) => {
      setPreview(view)
    },
    onClickUpload = () => {
      setLogo(preview)
      onClose()
    }

  return (
    <div>
      <div className='mb-4'>
        <Avatar
          height={300}
          onClose={onClose}
          onCrop={onCrop}
          src=''
          width={300}
        />
      </div>
      <div className='flex justify-center'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          data-test-id='upload-button'
          onClick={onClickUpload}
          type='button'
        >
          Upload
        </button>
      </div>
    </div>
  )
}

// Validate prop types
UploadAvatar.propTypes = {
  // `onClose` is a function that closes the modal.
  onClose: PropTypes.func.isRequired,
  // `setLogo` is a function that sets the logo state in the parent component.
  setLogo: PropTypes.func.isRequired,
}

export default UploadAvatar

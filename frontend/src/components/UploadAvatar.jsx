import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "react-avatar-edit";

const UploadAvatar = ({ setLogo, onClose }) => {
  const [preview, setPreview] = useState(null),

  onCrop = (view) => {
    setPreview(view);
  },

  onClickUpload = () => {
    setLogo(preview);
    onClose();
  };

  return (
    <div>
      <div className="mb-4">
        <Avatar
          width={300}
          height={300}
          onCrop={onCrop}
          onClose={onClose}
          src=""
        />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={onClickUpload}
          data-test-id="upload-button"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

// Validate prop types
UploadAvatar.propTypes = {
  // `setLogo` is a function that sets the logo state in the parent component.
  setLogo: PropTypes.func.isRequired, 
  // `onClose` is a function that closes the modal.
  onClose: PropTypes.func.isRequired, 
};

export default UploadAvatar;

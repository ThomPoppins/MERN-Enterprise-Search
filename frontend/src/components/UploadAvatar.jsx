import React, { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";

const UploadAvatar = ({ setLogo, onClose }) => {
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);

  const onCrop = (view) => {
    setPreview(view);
  };

  const onClickUpload = () => {
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
          src={src}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={onClickUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadAvatar;

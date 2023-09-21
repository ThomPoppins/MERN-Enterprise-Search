import React, { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";

const UploadAvatar = ({ setLogo }) => {
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);

  const onClose = () => {
    setPreview(null);
  };
  const onCrop = (view) => {
    setPreview(view);
  };

  useEffect(() => {
    console.log(preview);
    setLogo(preview);
  }, [preview]);

  return (
    <div>
      <Avatar
        width={300}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        src={src}
      />
    </div>
  );
};

export default UploadAvatar;

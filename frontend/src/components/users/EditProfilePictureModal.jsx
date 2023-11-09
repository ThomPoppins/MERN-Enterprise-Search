import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const EditProfilePictureModal = ({ onClose }) => {
  return (
    <div
      className="fixed bg-black/60 top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-auto border-2 border-purple-900 bg-violet-950/40 rounded-lg px-4 py-2 m-4 flex flex-col relative"
        data-test-id="company-modal"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-green-300 hover:text-red-500 cursor-pointer"
          onClick={onClose}
          data-test-id="close-button"
        />
      </div>
    </div>
  );
};

export default EditProfilePictureModal;

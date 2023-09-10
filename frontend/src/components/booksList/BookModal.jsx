import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      {/* stopPropagation() prevents the modal to close when user clicks inside the Modal but it closes when user clicks outside of the modal. */}
      {/* The click event will not bubble up to the parent elements where is a click event handler */}
      {/* https://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
          {book.publishYear}
        </h2>
        <h4 className="my-2 text-gray-500">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.author}</h2>
        </div>
        <p className="mt-4">Anything you want to show</p>
        <p className="my-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed
          dolor felis. In ultricies, augue eget blandit rutrum, sem nisi maximus
          metus, ut auctor magna odio sed tellus. Cras ullamcorper tristique
          lacus, mattis lacinia velit eleifend nec. Sed est leo, vehicula sed
          velit et, imperdiet suscipit magna. Aenean ornare vitae elit vitae
          egestas. Quisque erat leo, lacinia at dolor et, porttitor auctor
          ipsum. Sed pulvinar, lacus at pulvinar bibendum, nulla massa luctus
          nisi, id dignissim magna sem eget felis. Vivamus a ex ante. Curabitur
          a mauris ut lectus dapibus pretium.
        </p>
      </div>
    </div>
  );
};

export default BookModal;

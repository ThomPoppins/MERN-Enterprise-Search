import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FcBriefcase } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";

const CompanyModal = ({ owners, company, onClose }) => {
  return (
    <div
      className="fixed bg-black/60 top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      {/* stopPropagation() prevents the modal to close when user clicks inside the Modal but it closes when user clicks outside of the modal. */}
      {/* The click event will not bubble up to the parent elements where is a click event handler */}
      {/* https://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-auto bg-white rounded-xl p-4 flex flex-col relative"
        data-test-id="company-modal"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
          data-test-id="close-button"
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
          {company.startYear}
        </h2>
        <h4 className="my-2 text-gray-500">KVK: {company.kvkNumber}</h4>
        <div className="flex justify-center items-center gap-x-2 mb-4">
          <img
            className="w-[250px] h-[250px] rounded-full"
            src={company.logo}
            alt={company.name}
          />
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <FcBriefcase className="text-red-300 text-2xl" />
          <h2 className="my-1">{company.name}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <FcBusinessman className="text-red-300 text-2xl" />
          <h2 className="my-1">
            {owners
              ?.map((owner) => {
                return owner.firstName + " " + owner.lastName;
              })
              .join(", ")}
          </h2>
        </div>
        <p className="mt-4">
          <strong>{company.slogan}</strong>
        </p>
        <p className="my-2">{company.description}</p>
      </div>
    </div>
  );
};

export default CompanyModal;

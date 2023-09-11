import React from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import CompanyModal from "./CompanyModal";

const CompaniesSingleCard = ({ company }) => {
  const [showModal, setShowModal] = useState(false);
  const owners = company.owners.map((owner) => owner.name).join(", ");

  return (
    <div
      key={company._id}
      className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
    >
      <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
        {company.publishYear}
      </h2>
      <h4 className="my-2 text-gray-500">{company._id}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <PiBookOpenTextLight className="text-red-300 text-2xl" />
        <h2 className="my-1">{company.name}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-red-300 text-2xl" />
        <h2 className="my-1">{owners}</h2>
      </div>
      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <BiShow
          className="text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/companies/details/${company._id}`}>
          <BsInfoCircle className="text-green-800 text-2xl hover:text-black" />
        </Link>
        <Link to={`/companies/edit/${company._id}`}>
          <AiOutlineEdit className="text-yellow-600 text-2xl hover:text-black" />
        </Link>
        <Link to={`/companies/delete/${company._id}`}>
          <MdOutlineDelete className="text-red-600 text-2xl hover:text-black" />
        </Link>
      </div>
      {showModal && (
        <CompanyModal company={company} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CompaniesSingleCard;

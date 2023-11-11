import React, { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { FcBriefcase } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcCellPhone } from "react-icons/fc";
import { FcAddressBook } from "react-icons/fc";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import CompanyModal from "./CompanyModal";
import DeleteCompanyModal from "./DeleteCompanyModal";
import { BACKEND_URL } from "../../../config";

const CompaniesSingleCard = ({ company, updateCompanies }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const ownerPromises = company.owners.map((owner) =>
      axios.get(BACKEND_URL + `/users/user/${owner.userId}`)
    );

    Promise.all(ownerPromises)
      .then((responses) => {
        const ownersData = responses.map((response) => response.data);
        // @ts-ignore
        setOwners(ownersData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [company.owners]);

  return (
    <div
      key={`companies=single-card-${company._id}`}
      className="border-2 border-purple-900 bg-violet-950/40 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
    >
      <h2 className="absolute top-1 right-2 px-4 py-1 bg-purple-500 rounded-lg">
        {company.startYear}
      </h2>
      <h4 className="my-2 text-gray-500">KVK: {company.kvkNumber}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <FcBriefcase className="text-2xl" />
        <h2 className="my-1">{company.name}</h2>
      </div>
      {/* TODO: [MERNSTACK-136] Find fitting email icon from react-icons and replace the following icon with it */}
      <div className="flex justify-start items-center gap-x-2">
        <FcAddressBook className="text-2xl" />
        <h2 className="my-1">{company.email}</h2>
      </div>
      {/* TODO: [MERNSTACK-137] Find fitting phone icon from react-icons and replace the following icon with it */}
      <div className="flex justify-start items-center gap-x-2">
        <FcCellPhone className="text-2xl" />
        <h2 className="my-1">{company.phone}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <FcBusinessman className="text-2xl" />
        <h2>
          <span>
            {owners
              ?.map((owner) => {
                // @ts-ignore
                return owner.firstName + " " + owner.lastName;
              })
              .join(", ")}
          </span>
        </h2>
      </div>
      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <BiShow
          className="text-3xl text-white hover:text-green-300 cursor-pointer"
          onClick={() => setShowModal(true)}
          data-test-id="show-button"
        />
        <Link to={`/companies/details/${company._id}`}>
          <BsInfoCircle className="text-white text-2xl hover:text-green-300" />
        </Link>
        <Link to={`/companies/edit/${company._id}`}>
          <AiOutlineEdit className="text-white text-2xl hover:text-green-300" />
        </Link>
        <MdOutlineDelete
          onClick={() => setShowDeleteModal(true)}
          className="text-red-600 text-2xl hover:text-orange-600"
          data-test-id="delete-button"
        />
      </div>
      {showModal && (
        <CompanyModal
          owners={owners}
          company={company}
          onClose={() => setShowModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteCompanyModal
          companyId={company._id}
          updateCompanies={updateCompanies}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

CompaniesSingleCard.propTypes = {
  company: PropTypes.object.isRequired,
  updateCompanies: PropTypes.func.isRequired,
};

export default CompaniesSingleCard;

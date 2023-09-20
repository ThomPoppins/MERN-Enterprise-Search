import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import CompanyModal from "./CompanyModal";
import DeleteCompanyModal from "./DeleteCompanyModal";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

const CompaniesSingleRow = ({ company, updateCompanies }) => {
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
        setOwners(ownersData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [company.owners]);

  return (
    <>
      <td className="border border-slate-700 rounded-md text-center">
        {company.kvkNumber}
      </td>
      <td className="border border-slate-700 rounded-md text-left pl-3">
        {company.name}
      </td>
      <td className="border border-slate-700 rounded-md text-center">
        <div className="flex justify-center gap-x-4">
          <BiShow
            className="text-3xl text-blue-800 hover:text-black cursor-pointer"
            onClick={() => setShowModal(true)}
          />
          <Link to={`/companies/details/${company._id}`}>
            <BsInfoCircle className="text-2xl text-green-800" />
          </Link>
          <Link to={`/companies/edit/${company._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-600" />
          </Link>
          <MdOutlineDelete
            onClick={() => setShowDeleteModal(true)}
            className="text-red-600 text-2xl hover:text-black"
          />
        </div>
      </td>
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
    </>
  );
};

export default CompaniesSingleRow;

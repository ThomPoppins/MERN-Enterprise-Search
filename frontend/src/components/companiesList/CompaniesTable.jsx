import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const CompaniesTable = ({ companies }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md w-[150px]">
            KVK Number
          </th>
          <th className="border border-slate-600 rounded-md text-left pl-3">
            Name
          </th>
          {/* max-md:hidden hides this column on mobile devices and tablets */}
          <th className="border border-slate-600 rounded-md w-[150px]">
            Operations
          </th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company, index) => (
          <tr key={company._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {company.kvkNumber}
            </td>
            <td className="border border-slate-700 rounded-md text-left pl-3">
              {company.name}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/companies/details/${company._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link to={`/companies/edit/${company._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link to={`/companies/delete/${company._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompaniesTable;

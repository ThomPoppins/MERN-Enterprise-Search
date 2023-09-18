import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import CompaniesSingleRow from "./CompaniesSingleRow";

const CompaniesTable = ({ companies, updateCompanies }) => {
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
          <th className="border border-slate-600 rounded-md w-[180px]">
            Operations
          </th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company, index) => (
          <tr key={company._id} className="h-8">
            <CompaniesSingleRow
              company={company}
              updateCompanies={updateCompanies}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompaniesTable;

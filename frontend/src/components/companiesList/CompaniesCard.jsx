import React from "react";
import CompaniesSingleCard from "./CompaniesSingleCard";

const CompaniesCard = ({ companies }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {companies.map((item, index) => (
        <CompaniesSingleCard key={item._id} company={item} />
      ))}
    </div>
  );
};

export default CompaniesCard;

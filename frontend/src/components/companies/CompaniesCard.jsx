import React from "react";
import CompaniesSingleCard from "./CompaniesSingleCard";

const CompaniesCard = ({ companies, updateCompanies }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {companies.map((item) => (
        <div id={`company-card-${item._id}`} key={`company-card-${item._id}`}>
          <CompaniesSingleCard
            company={item}
            updateCompanies={updateCompanies}
          />
        </div>
      ))}
    </div>
  );
};

export default CompaniesCard;

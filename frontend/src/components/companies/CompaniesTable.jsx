import React from 'react';
import CompaniesSingleRow from './CompaniesSingleRow';

const CompaniesTable = ({ companies, updateCompanies }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border-4 border-purple-900 bg-violet-950/80 rounded-md w-[150px]'>
            KVK Number
          </th>
          <th className='border-4 border-purple-900 bg-violet-950/80 rounded-md text-left pl-3'>
            Name
          </th>
          {/* max-md:hidden hides this column on mobile devices and tablets */}
          <th className='border-4 border-purple-900 bg-violet-950/80 rounded-md w-[180px]'>
            Operations
          </th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company, index) => (
          <tr className='h-8' key={company._id}>
            <CompaniesSingleRow company={company} updateCompanies={updateCompanies} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompaniesTable;

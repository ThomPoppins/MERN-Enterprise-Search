import React from 'react'
import CompaniesSingleRow from './CompaniesSingleRow'
import PropTypes from 'prop-types'

const CompaniesTable = ({ companies, updateCompanies }) => (
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
      {companies.map((company) => (
        <tr className='h-8' key={company._id}>
          <CompaniesSingleRow
            company={company}
            updateCompanies={updateCompanies}
          />
        </tr>
      ))}
    </tbody>
  </table>
)

CompaniesTable.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      slogan: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      kvkNumber: PropTypes.string.isRequired,
      owners: PropTypes.arrayOf(
        PropTypes.shape({
          userId: PropTypes.string.isRequired,
        }),
      ).isRequired,
      startYear: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  updateCompanies: PropTypes.func.isRequired,
}

export default CompaniesTable

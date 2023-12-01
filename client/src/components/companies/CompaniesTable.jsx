import React from 'react'
import CompaniesSingleRow from './CompaniesSingleRow'
import PropTypes from 'prop-types'

const CompaniesTable = ({ companies, updateCompanies }) => (
  <table className='border-spacing-2 w-full border-separate'>
    <thead>
      <tr>
        <th className='bg-violet-950/80 w-[150px] rounded-md border-4 border-purple-900'>
          KVK Number
        </th>
        <th className='bg-violet-950/80 rounded-md border-4 border-purple-900 pl-3 text-left'>
          Name
        </th>
        {/* max-md:hidden hides this column on mobile devices and tablets */}
        <th className='bg-violet-950/80 w-[180px] rounded-md border-4 border-purple-900'>
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

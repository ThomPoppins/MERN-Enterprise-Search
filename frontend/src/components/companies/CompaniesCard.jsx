import React from 'react'
import PropTypes from 'prop-types'
import CompaniesSingleCard from './CompaniesSingleCard'

const CompaniesCard = ({ companies, updateCompanies }) => (
  <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
    {companies.map((item) => (
      <div id={`company-card-${item._id}`} key={`company-card-${item._id}`}>
        <CompaniesSingleCard company={item} updateCompanies={updateCompanies} />
      </div>
    ))}
  </div>
)

// Validate the prop types
CompaniesCard.propTypes = {
  // `companies` is an array of objects, each object representing a company
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
      startYear: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  // `updateCompanies` is a function that takes no arguments and returns nothing
  updateCompanies: PropTypes.func.isRequired,
}

export default CompaniesCard

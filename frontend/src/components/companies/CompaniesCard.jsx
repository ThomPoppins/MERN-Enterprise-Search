import React from 'react'
import PropTypes from 'prop-types'
import CompaniesSingleCard from './CompaniesSingleCard'

const CompaniesCard = ({ companies, updateCompanies }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {companies.map((item) => (
        <div id={`company-card-${item._id}`} key={`company-card-${item._id}`}>
          <CompaniesSingleCard company={item} updateCompanies={updateCompanies} />
        </div>
      ))}
    </div>
  )
}

// Validate the prop types
CompaniesCard.propTypes = {
  // `companies` is an array of objects, each object representing a company
  companies: PropTypes.array.isRequired,
  // `updateCompanies` is a function that takes no arguments and returns nothing
  updateCompanies: PropTypes.func.isRequired,
}

export default CompaniesCard

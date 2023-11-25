import React from 'react'
import PropTypes from 'prop-types'
import { FcBriefcase } from 'react-icons/fc'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const SearchResult = ({ navigateToCompanyDetails, result }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div
    className='m-4 mx-auto flex h-auto w-[600px] max-w-full flex-col rounded-lg border-2 border-purple-900 bg-violet-950/40 px-4 py-2'
    data-testid='search-result'
    key={result._id}
    onClick={(event) => navigateToCompanyDetails(event, result._id)}
    role='button'
    tabIndex={0}
  >
    <h2 className='w-fit rounded-lg bg-purple-500 px-4 py-1'>
      {result.startYear}
    </h2>
    <h4 className='my-2 text-gray-500'>KVK: {result.kvkNumber}</h4>
    <div className='mb-4 flex items-center justify-center gap-x-2'>
      <img
        alt={result.name}
        className='h-[250px] w-[250px] rounded-full'
        src={result.logoUrl ? `${BACKEND_URL}${result.logoUrl}` : ''}
      />
    </div>
    <div className='flex items-center justify-start gap-x-2'>
      <FcBriefcase className='text-2xl text-red-300' />
      <h2 className='my-1'>{result.name}</h2>
    </div>
    <p className='mt-4'>
      <strong>{result.slogan}</strong>
    </p>
    <p className='my-2'>{result.description}</p>
  </div>
)

SearchResult.propTypes = {
  navigateToCompanyDetails: PropTypes.func.isRequired,
  result: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    kvkNumber: PropTypes.string.isRequired,
    logoUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slogan: PropTypes.string.isRequired,
    startYear: PropTypes.string.isRequired,
  }).isRequired,
}

export default SearchResult

import PropTypes from 'prop-types'
import React from 'react'

import { BACKEND_URL } from '../../../config'

const MainSearch = ({
  findButtonPing,
  handleFind,
  handleSearchQueryChange,
  searchQuery,
}) => (
  <div className='mx-auto h-auto rounded-xl border border-purple-900 bg-violet-950/40 p-4 md:w-[800px] lg:w-[1000px]'>
    <img
      alt='profile'
      className='float-left ml-3 mr-2 mt-12 h-24 w-24 rounded-xl object-cover md:mr-8 md:mt-8 md:h-32 md:w-32'
      src={`${BACKEND_URL}/logo/vind-expert-transparent.png`}
    />
    <div className='ml-4 mr-8 flex flex-col'>
      <h1 className='mt-11 text-4xl md:text-6xl'>Vind-Expert</h1>
      <div className='relative'>
        <div className='float-left mb-3 ml-0 mt-6'>
          <p className=''>
            Search any keywords to find the best relevant professionals in your
            area first.
          </p>
        </div>
      </div>
    </div>
    <div className='display-block mb-12 ml-3 mt-8 flex flex-col items-end md:flex-row md:items-center'>
      <div className='w-full'>
        <input
          className='h-[50px] w-full rounded-xl border-2 border-purple-900 bg-cyan-100 px-4 py-2 text-gray-800 focus:bg-white md:w-[570px] lg:w-[770px]'
          data-testid='find-expert-search-query-input'
          onBlur={(event) => {
            // select this element
            event.target.select()

            // clear placeholder
            // eslint-disable-next-line no-param-reassign
            event.target.placeholder =
              'or example: plumber, electrician, gardener, developer, something else...'
          }}
          onChange={handleSearchQueryChange}
          onFocus={(event) => {
            // select this element
            event.target.select()

            // clear placeholder
            // eslint-disable-next-line no-param-reassign
            event.target.placeholder = ''
          }}
          placeholder='For example: plumber, electrician, gardener, developer, something else...'
          type='text'
          value={searchQuery}
        />
      </div>

      <div className='mr-3 mt-8 block md:mt-0 md:inline-block'>
        <button
          className={`ml-2 h-[50px] w-[160px] rounded-lg bg-gradient-to-r pl-4 ${
            findButtonPing
              ? 'animate-ping-once bg-gradient-to-l from-green-500 to-green-400'
              : 'animate-bounce-fast  from-violet-500 to-violet-600 hover:bg-gradient-to-l hover:from-green-500 hover:to-green-400'
          }`}
          data-testid='find-button'
          onClick={handleFind}
          type='button'
        >
          <div className='mx-auto'>
            <div className='float-left ml-7 py-2 text-xl'>Find </div>
            <img
              alt='Vind-Expert find button'
              className='rounded-xs float-right ml-2 mr-8 mt-[13px] h-5 w-5 object-cover'
              src={`${BACKEND_URL}/logo/vind-expert-transparent.png`}
            />
          </div>
        </button>
      </div>
    </div>
  </div>
)

MainSearch.propTypes = {
  findButtonPing: PropTypes.bool.isRequired,
  handleFind: PropTypes.func.isRequired,
  handleSearchQueryChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
}

// Set default prop values if not explicitly set in story or parent component
MainSearch.defaultProps = {
  searchQuery: '',
}

export default MainSearch

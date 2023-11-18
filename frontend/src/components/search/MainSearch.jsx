import PropTypes from 'prop-types'
import React from 'react'

import { BACKEND_URL } from '../../../config'

const MainSearch = ({
  findButtonPing,
  handleFind,
  handleSearchQueryChange,
  searchQuery,
}) => (
  <div className='mx-auto min-h-[440px] lg:w-9/12 border border-purple-900 bg-violet-950/40 rounded-xl p-4'>
    <img
      alt='profile'
      className='w-32 h-32 mt-8 ml-3 mr-8 rounded-xl float-left object-cover'
      src={`${BACKEND_URL}/logo/vind-expert-transparent.png`}
    />
    <div className='ml-4'>
      <h1 className='text-6xl mt-11'>Vind-Expert</h1>
      <div className='relative'>
        <div className='ml-0 mt-6 mb-3 w-1/2 float-left'>
          <p className=''>
            Search any keywords to find the best relevant professionals in your
            area first.
          </p>
        </div>
        <div className='absolute top-[120px] left-[172px] w-full mt-6 mb-3'>
          <input
            className='absolute right-[400px] top-[-34px] h-[50px]  border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 py-2 px-4 mt-6 w-2/3'
            data-testid='find-expert-search-query-input'
            onChange={handleSearchQueryChange}
            onFocus={(event) => {
              // select this element
              event.target.select()

              // clear placeholder
              // eslint-disable-next-line no-param-reassign
              event.target.placeholder = ''
            }}
            onBlur={(event) => {
              // select this element
              event.target.select()

              // clear placeholder
              // eslint-disable-next-line no-param-reassign
              event.target.placeholder =
                'or example: plumber, electrician, gardener, developer, something else...'
            }}
            placeholder='For example: plumber, electrician, gardener, developer, something else...'
            type='text'
            value={searchQuery}
          />
          <button
            className={`absolute top-[-41px] right-[195px] h-[50px] w-[160px] bg-gradient-to-r  rounded-lg m-8 pl-4  ${
              findButtonPing
                ? 'animate-ping-once bg-gradient-to-l from-green-500 to-green-400'
                : 'animate-bounce-fast  from-violet-500 to-violet-600 hover:bg-gradient-to-l hover:from-green-500 hover:to-green-400'
            }`}
            data-testid='find-button'
            onClick={handleFind}
            type='button'
          >
            <div className='mx-auto'>
              <div className='py-2 ml-7 text-xl float-left'>Find </div>
              <img
                alt='Vind-Expert find button'
                className='w-5 h-5 mt-[13px] mr-8 rounded-xs object-cover ml-2 float-right'
                src={`${BACKEND_URL}/logo/vind-expert-transparent.png`}
              />
            </div>
          </button>
        </div>
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

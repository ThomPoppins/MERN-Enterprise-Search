import PropTypes from 'prop-types'
import React from 'react'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const MainSearch = ({
  findButtonPing,
  handleFind,
  handleSearchQueryChange,
  isDisabled,
  searchQuery,
}) => {
  const descriptionText = isDisabled ? (
    <span>
      <a className='text-blue-400 hover:text-purple-500' href='/sign-up'>
        Sign up
      </a>{' '}
      or{' '}
      <a className='text-blue-400 hover:text-purple-500' href='/login'>
        login
      </a>{' '}
      to your account to find the best professionals in your area!
    </span>
  ) : (
    <span>
      Search any keywords, could be a profession, a skill, a hobby, a product or
      industry.
    </span>
  )

  return (
    <div className='mx-auto h-auto rounded-xl border border-purple-900 bg-violet-950/40 p-4 pr-8 md:w-[800px] lg:w-[1000px]'>
      <img
        alt='profile'
        className='float-left ml-3 mr-2 mt-4 h-10 w-10 rounded-xl object-cover md:mr-8 md:mt-12 md:mt-8 md:h-32 md:w-32'
        src={`${BACKEND_URL}/logo/find-best-pro-transparent.png`}
      />
      <div className='ml-4 mr-8 flex flex-col'>
        <h1 className='mt-4 text-2xl md:mt-11 md:text-6xl'>Best-Pro&apos;s</h1>
        <div className='relative float-left mb-3 ml-0 mt-6 hidden md:block'>
          <p className=''>{descriptionText}</p>
        </div>
      </div>
      <div className='mb-2 ml-3 mt-2 block flex w-full flex-col items-center md:mb-12 md:mt-8 md:flex-row md:items-center'>
        <div className='mb-3 ml-0 mt-2 block md:hidden'>
          <p className=''>{descriptionText}</p>
        </div>

        <div className=''>
          <input
            className='block h-[50px] w-full disabled:bg-gray-300 rounded-xl border-2 border-purple-900 bg-cyan-100 px-4 py-2 text-gray-800 focus:bg-white md:mb-0 md:mr-3 md:w-[570px] lg:w-[770px]'
            data-testid='find-expert-search-query-input'
            disabled={isDisabled}
            onBlur={(event) => {
              // select this element
              event.target.select()

              // clear placeholder
              // eslint-disable-next-line no-param-reassign
              event.target.placeholder =
                'Search any keywords, could be a profession, a skill, a hobby, a product or industry.'
            }}
            onChange={handleSearchQueryChange}
            onFocus={(event) => {
              // select this element
              event.target.select()

              // clear placeholder
              // eslint-disable-next-line no-param-reassign
              event.target.placeholder = ''
            }}
            placeholder={
              isDisabled
                ? 'Sign up for an account and find the best professionals in your area!'
                : 'Search any keywords, could be a profession, a skill, a hobby, a product or industry.'
            }
            type='text'
            value={searchQuery}
          />
        </div>

        <div className='mr-3 mt-8 block md:mt-0 md:inline-block'>
          <button
            className={`ml-2 h-[50px] w-[160px] rounded-lg bg-gradient-to-r pl-4 disabled:animate-none disabled:from-gray-500 disabled:to-gray-400 ${
              findButtonPing
                ? 'animate-ping-once bg-gradient-to-l from-green-500 to-green-400'
                : 'animate-bounce-fast  from-violet-500 to-violet-600 hover:bg-gradient-to-l hover:from-green-500 hover:to-green-400'
            }`}
            data-testid='find-button'
            disabled={searchQuery.length < 1 || isDisabled}
            onClick={handleFind}
            type='button'
          >
            <div className='mx-auto'>
              <div className='float-left ml-7 py-2 text-xl'>Find </div>
              <img
                alt="Best-Pro's find button"
                className='rounded-xs float-right ml-2 mr-8 mt-[13px] h-5 w-5 object-cover'
                src={`${BACKEND_URL}/logo/find-best-pro-transparent.png`}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

MainSearch.propTypes = {
  findButtonPing: PropTypes.bool.isRequired,
  handleFind: PropTypes.func.isRequired,
  handleSearchQueryChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string,
}

// Set default prop values if not explicitly set in story or parent component
MainSearch.defaultProps = {
  searchQuery: '',
}

export default MainSearch

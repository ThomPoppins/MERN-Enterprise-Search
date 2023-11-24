import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const BackButton = ({ destination }) => (
  <div className='flex'>
    <Link
      className='w-fit rounded-lg bg-gradient-to-r from-violet-500 to-violet-600 px-4 py-1 text-white hover:bg-gradient-to-l hover:from-green-500 hover:to-green-400'
      to={destination}
    >
      <BsArrowLeft className='text-2xl' />
    </Link>
  </div>
)

// Validate prop types
BackButton.propTypes = {
  // destination is a string and the redirect destination
  destination: PropTypes.string,
}

// Define default props
BackButton.defaultProps = {
  destination: '/',
}

export default BackButton

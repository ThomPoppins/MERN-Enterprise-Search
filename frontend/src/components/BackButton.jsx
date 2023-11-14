import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const BackButton = ({ destination }) => (
    <div className='flex'>
      <Link
        className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'
        to={destination}
      >
        <BsArrowLeft className='text-2xl' />
      </Link>
    </div>
  )

// Validate prop types
BackButton.propTypes = {
  destination: PropTypes.string, // destination is a string and the redirect destination
}

// Define default props
BackButton.defaultProps = {
  destination: '/',
}

export default BackButton

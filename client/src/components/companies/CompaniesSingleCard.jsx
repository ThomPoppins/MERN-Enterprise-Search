import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BiShow } from 'react-icons/bi'
import {
  FcCellPhone,
  FcBusinessman,
  FcAddressBook,
  FcBriefcase,
} from 'react-icons/fc'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import CompanyModal from './CompanyModal'
import DeleteCompanyModal from './DeleteCompanyModal'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const CompaniesSingleCard = ({ company, updateCompanies }) => {
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [owners, setOwners] = useState([])

  useEffect(() => {
    const ownerPromises = company.owners.map((owner) =>
      axios.get(`${BACKEND_URL}/users/user/${owner.userId}`),
    )

    Promise.all(ownerPromises)
      .then((responses) => {
        const ownersData = responses.map((response) => response.data)
        //
        setOwners(ownersData)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [company.owners])

  return (
    <div
      className='bg-violet-950/40 relative m-4 rounded-lg border-2 border-purple-900 px-4 py-2 hover:shadow-xl'
      key={`companies=single-card-${company._id}`}
    >
      <h2 className='absolute top-1 right-2 rounded-lg bg-purple-500 px-4 py-1'>
        {company.startYear}
      </h2>
      <h4 className='my-2 text-gray-300'>KVK: {company.kvkNumber}</h4>
      <div className='flex items-center justify-start gap-x-2'>
        <FcBriefcase className='text-2xl' />
        <h2 className='my-1'>
          {company.name.substring(0, 28)}
          {company.name.length > 28 ? '...' : ''}
        </h2>
      </div>
      {/* TODO: [MERNSTACK-136] Find fitting email icon from react-icons and replace the following icon with it */}
      <div className='flex items-center justify-start gap-x-2'>
        <FcAddressBook className='text-2xl' />
        <h2 className='my-1'>
          {company.email.substring(0, 28)}
          {company.email.length > 28 ? '...' : ''}
        </h2>
      </div>
      {/* TODO: [MERNSTACK-137] Find fitting phone icon from react-icons and replace the following icon with it */}
      <div className='flex items-center justify-start gap-x-2'>
        <FcCellPhone className='text-2xl' />
        <h2 className='my-1'>{company.phone}</h2>
      </div>
      <div className='flex items-center justify-start gap-x-2'>
        <FcBusinessman className='text-2xl' />
        <h2>
          <span>
            {owners
              ?.map(
                (owner) =>
                  //
                  `${owner.firstName} ${owner.lastName}`,
              )
              .join(', ')}
          </span>
        </h2>
      </div>
      <div className='mt-4 flex items-center justify-between gap-x-2 p-4'>
        <BiShow
          className='cursor-pointer text-3xl text-white hover:text-green-300'
          data-test-id='show-button'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/companies/details/${company._id}`}>
          <BsInfoCircle className='text-2xl text-white hover:text-green-300' />
        </Link>
        <Link to={`/companies/edit/${company._id}`}>
          <AiOutlineEdit className='text-2xl text-white hover:text-green-300' />
        </Link>
        <MdOutlineDelete
          className='text-2xl text-red-600 hover:text-orange-600'
          data-test-id='delete-button'
          onClick={() => setShowDeleteModal(true)}
        />
      </div>
      {showModal ? (
        <CompanyModal
          company={company}
          onClose={() => setShowModal(false)}
          owners={owners}
        />
      ) : null}
      {showDeleteModal ? (
        <DeleteCompanyModal
          companyId={company._id}
          onClose={() => setShowDeleteModal(false)}
          updateCompanies={updateCompanies}
        />
      ) : null}
    </div>
  )
}

CompaniesSingleCard.propTypes = {
  company: PropTypes.shape({
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
  }).isRequired,
  updateCompanies: PropTypes.func.isRequired,
}

export default CompaniesSingleCard

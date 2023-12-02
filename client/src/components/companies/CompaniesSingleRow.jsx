import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import { BiShow } from 'react-icons/bi'
import CompanyModal from './CompanyModal'
import DeleteCompanyModal from './DeleteCompanyModal'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const CompaniesSingleRow = ({ company, updateCompanies }) => {
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
    <>
      <td className='bg-violet-950/40 rounded-md border border-purple-900 text-center'>
        {company.kvkNumber}
      </td>
      <td className='bg-violet-950/40 rounded-md border border-purple-900 pl-3 text-left'>
        {company.name}
      </td>
      <td className='bg-violet-950/40 rounded-md border border-purple-900 text-center'>
        <div className='flex justify-center gap-x-4'>
          <BiShow
            className='cursor-pointer text-3xl text-white hover:text-green-300'
            data-testid='show-button'
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
            data-testid='delete-button'
            onClick={() => setShowDeleteModal(true)}
          />
        </div>
      </td>
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
    </>
  )
}

CompaniesSingleRow.propTypes = {
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

export default CompaniesSingleRow

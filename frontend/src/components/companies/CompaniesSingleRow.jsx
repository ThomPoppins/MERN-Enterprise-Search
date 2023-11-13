import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import { BiShow } from 'react-icons/bi'
import CompanyModal from './CompanyModal'
import DeleteCompanyModal from './DeleteCompanyModal'
import axios from 'axios'
import { BACKEND_URL } from '../../../config'

const CompaniesSingleRow = ({ company, updateCompanies }) => {
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [owners, setOwners] = useState([])

  useEffect(() => {
    const ownerPromises = company.owners.map((owner) =>
      axios.get(BACKEND_URL + `/users/user/${owner.userId}`),
    )

    Promise.all(ownerPromises)
      .then((responses) => {
        const ownersData = responses.map((response) => response.data)
        // @ts-ignore
        setOwners(ownersData)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [company.owners])

  return (
    <>
      <td className='border border-purple-900 bg-violet-950/40 rounded-md text-center'>
        {company.kvkNumber}
      </td>
      <td className='border border-purple-900 bg-violet-950/40 rounded-md text-left pl-3'>
        {company.name}
      </td>
      <td className='border border-purple-900 bg-violet-950/40 rounded-md text-center'>
        <div className='flex justify-center gap-x-4'>
          <BiShow
            className='text-3xl text-white hover:text-green-300 cursor-pointer'
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
            className='text-red-600 text-2xl hover:text-orange-600'
            data-test-id='delete-button'
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

export default CompaniesSingleRow

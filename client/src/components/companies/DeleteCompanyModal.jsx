import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import Loader from '../animated/Loader'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const CompanyModal = ({ companyId, updateCompanies, onClose }) => {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteCompany = () => {
    setLoading(true)
    axios
      .delete(`${BACKEND_URL}/companies/${companyId}`)
      .then(() => {
        setLoading(false)
        enqueueSnackbar('Company deleted successfully!', {
          variant: 'success',
          preventDuplicate: true,
        })
        updateCompanies()
        onClose()
      })
      .catch((error) => {
        setLoading(false)
        enqueueSnackbar('Error deleting company!', {
          variant: 'error',
          preventDuplicate: true,
        })
        console.log(error)
      })
  }

  return (
    <div
      className='fixed bg-black/60 top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center'
      data-testid='company-delete-modal'
      onClick={onClose}
      onKeyDown={onClose}
      role='button'
      tabIndex={0}
    >
      {/* stopPropagation() prevents the modal to close when user clicks inside the Modal but it closes when user clicks outside of the modal. */}
      {/* The click event will not bubble up to the parent elements where is a click event handler */}
      {/* https://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing */}
      <div
        className='w-[600px] max-w-full h-[240px] bg-white rounded-xl p-4 flex flex-col items-center relative'
        data-='company-delete-modal'
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
        role='button'
        tabIndex={0}
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          data-testid='close-button'
          onClick={onClose}
        />

        {loading ? <Loader /> : ''}
        <div className='flex flex-col items-center rounded-xl w-[500px] p-8 mx-auto'>
          <h3 className='text-2xl text-gray-700'>
            Are you sure you want to delete this company?
          </h3>
          <button
            className='p-4 bg-red-600 text-white m-8 w-full'
            data-testid='delete-company-button'
            onClick={handleDeleteCompany}
            type='button'
          >
            Yes, delete it!
          </button>
        </div>
      </div>
    </div>
  )
}

CompanyModal.propTypes = {
  companyId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  updateCompanies: PropTypes.func.isRequired,
}

export default CompanyModal

import React from 'react'
import PropTypes from 'prop-types'
import { AiOutlineClose } from 'react-icons/ai'
import UploadAvatar from '../UploadAvatar'

const CompanyLogoModal = ({ setLogo, onClose }) => (
  <div
    className='fixed bg-black bg-opacity-60 top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center'
    daya-testid='company-logo-modal'
    onClick={onClose}
    onKeyDown={(event) => event.key === 'Escape' && onClose()}
    role='button'
    tabIndex={0}
  >
    {/* stopPropagation() prevents the modal to close when user clicks inside the Modal but it closes when user clicks outside of the modal. */}
    {/* The click event will not bubble up to the parent elements where is a click event handler */}
    {/* https://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing */}
    <div
      className='w-[600px] max-w-full h-auto bg-white rounded-xl p-4 flex flex-col relative'
      data-testid='company-logo-modal-content'
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.key === 'Escape' && onClose()}
      role='button'
      tabIndex='0'
    >
      <AiOutlineClose
        className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
        data-testid='close-button'
        onClick={onClose}
      />
      <div className='flex justify-center items-center my-4'>
        <UploadAvatar onClose={onClose} setLogo={setLogo} />
      </div>
    </div>
  </div>
)

CompanyLogoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  setLogo: PropTypes.func.isRequired,
}

export default CompanyLogoModal

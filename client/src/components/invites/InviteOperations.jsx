import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const InviteOperations = ({ invite, updateInviteStatus }) => {
  // Spin accept button (after click Find)
  const [acceptButtonSpinning, setAcceptButtonSpinning] = useState(false)
  const [declineButtonPing, setDeclineButtonPing] = useState(false)

  //
  const user = useSelector((state) => state.user)
  //
  const userId = useSelector((state) => state.userId)

  const handleAcceptInvite = async () => {
    setAcceptButtonSpinning(true)

    // Add the user as owner to the company
    await axios
      .put(
        `${BACKEND_URL}/companies/${invite.companyId}/add-owner/${invite.receiverId}`,
      )
      .then((response) => {
        console.log('Added user to company: ', response)

        // Update the invite status to "accepted"
        updateInviteStatus(invite._id, 'accepted')
      })
      .catch((error) => {
        console.log(
          'ERROR in InviteOperations.jsx add user to company: ',
          error,
        )
      })

    // Timeout for stopping the animation after 2 seconds
    setTimeout(() => {
      setAcceptButtonSpinning(false)

      console.log('Accepted invite: ', invite._id)
    }, 2000)
  }

  return (
    <div id={`operations-${invite._id}`} key={invite._id}>
      <span className='text-xl'>
        <button
          className={`float-left ml-1 w-[82px] rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-400 hover:to-green-500 ${
            acceptButtonSpinning
              ? 'animate-spin-fast'
              : 'animate-bounce hover:animate-none'
          }`}
          data-testid='accept-button'
          onClick={handleAcceptInvite}
        >
          Accept
        </button>
        <div className='pb-6'>
          <button
            className={`float-right mr-1 w-[82px] rounded-lg bg-red-900/90 hover:bg-gradient-to-r ${
              declineButtonPing ? 'animate-ping' : ''
            }`}
            data-testid='decline-button'
            onClick={() => {
              setDeclineButtonPing(true)
              updateInviteStatus(invite._id, 'declined')
              setTimeout(() => {
                setDeclineButtonPing(false)
              }, 1000)
            }}
          >
            Decline
          </button>
        </div>
      </span>
    </div>
  )
}

export default InviteOperations

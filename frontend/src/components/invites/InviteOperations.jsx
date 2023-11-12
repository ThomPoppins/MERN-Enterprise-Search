import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { use } from 'chai';
import { useSelector } from 'react-redux';
import { BACKEND_URL } from '../../../config';

const InviteOperations = ({ invite, updateInviteStatus }) => {
  // Spin accept button (after click Find)
  const [acceptButtonSpinning, setAcceptButtonSpinning] = useState(false);
  const [declineButtonPing, setDeclineButtonPing] = useState(false);

  // @ts-ignore
  const user = useSelector((state) => state.user);
  // @ts-ignore
  const userId = useSelector((state) => state.userId);

  const handleAcceptInvite = async () => {
    setAcceptButtonSpinning(true);

    // Add the user as owner to the company
    await axios
      .put(`${BACKEND_URL}/companies/${invite.companyId}/add-owner/${invite.receiverId}`)
      .then((response) => {
        console.log('Added user to company: ', response);

        // Update the invite status to "accepted"
        updateInviteStatus(invite._id, 'accepted');
      })
      .catch((error) => {
        console.log('ERROR in InviteOperations.jsx add user to company: ', error);
      });

    // Timeout for stopping the animation after 2 seconds
    setTimeout(() => {
      setAcceptButtonSpinning(false);

      console.log('Accepted invite: ', invite._id);
    }, 2000);
  };

  return (
    <div id={'operations-' + invite._id} key={invite._id}>
      <span className='text-xl'>
        <button
          className={`bg-gradient-to-r from-green-600 to-green-700 hover:from-green-400 hover:to-green-500 rounded-lg w-[82px] float-left ml-1 ${
            acceptButtonSpinning ? 'animate-spin-fast' : 'animate-bounce hover:animate-none'
          }`}
          onClick={handleAcceptInvite}
          data-test-id='accept-button'
        >
          Accept
        </button>
        <div className='pb-6'>
          <button
            className={`hover:bg-gradient-to-r bg-red-900/90 rounded-lg w-[82px] float-right mr-1 ${
              declineButtonPing ? 'animate-ping' : ''
            }`}
            onClick={() => {
              setDeclineButtonPing(true);
              updateInviteStatus(invite._id, 'declined');
              setTimeout(() => {
                setDeclineButtonPing(false);
              }, 1000);
            }}
            data-test-id='decline-button'
          >
            Decline
          </button>
        </div>
      </span>
    </div>
  );
};

export default InviteOperations;

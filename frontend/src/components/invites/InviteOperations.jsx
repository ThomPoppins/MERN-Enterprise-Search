import React, { useState, useEffect } from "react";
import axios from "axios";
import { use } from "chai";

const InviteOperations = ({ invite, updateInviteStatus }) => {
  // Spin accept button (after click Find)
  const [acceptButtonSpinning, setAcceptButtonSpinning] = useState(false);
  const [declineButtonPing, setDeclineButtonPing] = useState(false);

  const handleAcceptInvite = async () => {
    setAcceptButtonSpinning(true);

    // Update the invite status to "accepted"
    updateInviteStatus(invite._id, "accepted");

    // Timeout for stopping the animation after 2 seconds
    setTimeout(() => {
      setAcceptButtonSpinning(false);

      console.log("Accepted invite: ", invite._id);
    }, 2000);
  };

  return (
    <div id={"operations-" + invite._id} key={invite._id}>
      <span className="text-xl">
        <button
          className={`bg-gradient-to-r from-green-600 to-green-700 hover:from-green-400 hover:to-green-500 rounded-lg w-[82px] float-left ml-1 ${
            acceptButtonSpinning
              ? "animate-spin"
              : "animate-bounce hover:animate-none"
          }`}
          onClick={handleAcceptInvite}
        >
          Accept
        </button>
        <div className="pb-6">
          <button
            className={`hover:bg-gradient-to-r bg-red-900/90 rounded-lg w-[82px] float-right mr-1 ${
              declineButtonPing ? "animate-ping" : ""
            }`}
            onClick={() => {
              setDeclineButtonPing(true);
              updateInviteStatus(invite._id, "declined");
              setTimeout(() => {
                setDeclineButtonPing(false);
              }, 1000);
            }}
          >
            Decline
          </button>
        </div>
      </span>
    </div>
  );
};

export default InviteOperations;

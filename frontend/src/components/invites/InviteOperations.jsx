import React, { useState } from "react";
import axios from "axios";

const InviteOperations = ({
  invite,
  updateInviteStatus,
  removeAcceptedFromList,
}) => {
  // Spin accept button (after click Find)
  const [acceptButtonSpinning, setAcceptButtonSpinning] = useState(false);

  const handleAcceptInvite = async () => {
    setAcceptButtonSpinning(true);

    // Update the invite status to "accepted"
    updateInviteStatus(invite._id, "accepted");

    // Timeout for stopping the animation after 2 seconds
    setTimeout(() => {
      setAcceptButtonSpinning(false);

      console.log("Accepted invite: ", invite._id);

      removeAcceptedFromList(invite._id);
    }, 2000);
  };

  return (
    <div id={"operations-" + invite._id} key={invite._id}>
      <span className="text-xl">
        <button
          className={`w-1/2 hover:bg-gradient-to-r bg-green-400 rounded-lg animate-pulse w-[82px] float-left ml-1 ${
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
            className={`w-1/2 hover:bg-gradient-to-r bg-red-800 rounded-lg animate-pulse w-[82px] float-right mr-1`}
          >
            Decline
          </button>
        </div>
      </span>
    </div>
  );
};

export default InviteOperations;

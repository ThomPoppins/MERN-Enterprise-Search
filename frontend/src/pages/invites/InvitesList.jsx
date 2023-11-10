import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PENDING_RECIEVED_INVITES } from "../../store/actions";
import { getPendingRecievedInvites } from "../../utils/invites/recievedInvitesUpdater";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import InviteOperations from "../../components/invites/InviteOperations";
import Layout from "../../components/layout/Layout";
import store from "../../store/store";
import { use } from "chai";

const InvitesList = () => {
  // The invites in the list
  const [invites, setInvites] = useState([]);

  // Get userId state from Redux store
  // @ts-ignore
  const userId = useSelector((state) => state.userId);

  // Get pending recieved invites from Redux store
  const pendingRecievedInvites = useSelector(
    // @ts-ignore
    (state) => state.pendingRecievedInvites
  );

  // Get the invites for the user
  const getPendingInvites = async () => {
    try {
      // Get the pending recieved invites for the user
      const response = await axios
        .get(`${BACKEND_URL}/invites/reciever/${userId}/pending`)
        .then((response) => {
          console.log("Invites response: ", response);

          setInvites(response.data);

          // Update the pending reciever invites Redux state
          store.dispatch({
            type: PENDING_RECIEVED_INVITES,
            payload: response.data,
          });
        })
        .catch((error) => {
          console.log("ERROR in InvitesList.jsx get pending invites: ", error);
        });
    } catch (error) {
      // TODO: Handle error
      console.log(error);
    }
  };

  useEffect(() => {
    getPendingInvites();
    getPendingRecievedInvites();
  }, []);

  useEffect(() => {
    setInvites(pendingRecievedInvites);
  }, [pendingRecievedInvites]);

  //! STATUS STATES: "pending", "accepted", "declined" and "canceled"
  const updateInviteStatus = async (inviteId, newStatus) => {
    const response = await axios.put(
      `${BACKEND_URL}/invites/status/${inviteId}`,
      {
        status: newStatus,
      }
    );

    console.log("Update invite status response: ", response);

    setTimeout(async () => {
      // Update the invites state
      await getPendingInvites();
      await getPendingRecievedInvites();
    }, 2200);
  };

  return (
    <Layout>
      <div className="flex justify-center mt-4">
        <table className="w-3/4 border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border-4 border-purple-900 bg-violet-950/80 rounded-md w-[400px]">
                From
              </th>
              <th className="border-4 border-purple-900 bg-violet-950/80 rounded-md pl-3">
                Kind
              </th>
              <th className="border-4 border-purple-900 bg-violet-950/80 rounded-md w-[175px] pl-3">
                Status
              </th>
              {/* max-md:hidden hides this column on mobile devices and tablets */}
              <th className="border-4 border-purple-900 bg-violet-950/80 rounded-md w-[180px]">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log("Invites in JSX", invites)} */}
            {invites?.map((invite) => (
              <tr
                id={
                  "invite-row-" +
                  // @ts-ignore
                  invite._id
                }
                // @ts-ignore
                key={invite._id}
              >
                <td className="border-purple-900 bg-violet-950/40">
                  <img
                    className="rounded-full mr-4 float-left"
                    width="50"
                    height="50"
                    // @ts-ignore
                    src={invite.sender.profilePictureURL}
                    alt="profile picture"
                  />
                  <div className="flex flex-col">
                    <div>
                      <span className="mr-4">
                        {
                          // @ts-ignore
                          invite.sender.firstName
                        }{" "}
                        {/* @ts-ignore */}
                        {invite.sender.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="mr-4 text-blue-400">
                        {/* @ts-ignore */}
                        &#64;{invite.sender.username}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="border-purple-900 bg-violet-950/40">
                  <span className="mr-4">
                    {/* @ts-ignore */}
                    {invite.kind === "company_ownership" ? (
                      <span>
                        Invited for co-ownership of {/* @ts-ignore */}
                        <strong>{invite.company.name}</strong>
                      </span>
                    ) : // @ts-ignore
                    invite.kind === "friend_request" ? (
                      <span>Friend Request</span>
                    ) : (
                      <span className="text-red-600 font-bold">
                        ERROR: Invite kind is unknown!
                      </span>
                    )}
                  </span>
                </td>
                <td className="border-purple-900 bg-violet-950/40">
                  {/* @ts-ignore */}
                  <span className="mr-4">{invite.status}</span>
                </td>
                <td className="border-purple-900 bg-violet-950/40">
                  {/* InviteOperations component is responsible for updating the invite status */}
                  <InviteOperations
                    invite={invite}
                    updateInviteStatus={updateInviteStatus}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default InvitesList;

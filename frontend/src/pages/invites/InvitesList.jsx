import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPendingRecievedInvites } from "../../utils/invites/recievedInvitesUpdater";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import InviteOperations from "../../components/invites/InviteOperations";
import Layout from "../../components/layout/Layout";

const InvitesList = () => {
  // The invites in the list
  const [invites, setInvites] = useState([]);

  // Navigation to other routes
  const navigate = useNavigate();

  // @ts-ignore Get userId state from Redux store
  const userId = useSelector((state) => state.userId);
  // @ts-ignore Get user state from Redux store
  const user = useSelector((state) => state.user);

  // Get pending recieved invites from Redux store
  const pendingRecievedInvites = useSelector(
    // @ts-ignore
    (state) => state.pendingRecievedInvites
  );

  useEffect(() => {
    // getPendingInvites();
    getPendingRecievedInvites();
  }, [user, userId]);

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

    Promise.resolve(getPendingRecievedInvites())
      .then((value) => {
        console.log("InvitesList.jsx updateInviteStatus value: ", value);

        setTimeout(() => {
          // @ts-ignore
          const filteredPendingRecievedInvites = pendingRecievedInvites.filter(
            (invite) => invite._id !== inviteId
          );

          if (filteredPendingRecievedInvites.length === 0) {
            navigate("/companies");
            return;
          }

          setInvites(filteredPendingRecievedInvites);
        }, 1000);

        // Filter out the invite that was updated
        // @ts-ignore
      })
      .catch((error) => {
        console.log("ERROR in InvitesList.jsx updateInviteStatus: ", error);
      });
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

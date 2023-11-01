import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import Navbar from "../../components/layout/Navbar";
import { current } from "@reduxjs/toolkit";

const InvitesList = () => {
  const [invites, setInvites] = useState([]);

  // Get userId state from Redux store
  const userId = useSelector((state) => state.userId);

  const getInvites = async () => {
    // Get invites from backend for current user as recipient
    await axios
      .get(BACKEND_URL + `/invites/recipient/${userId}`)
      .then((response) => {
        const invitesArray = [];

        response.data.forEach(async (invite) => {
          const currentInvite = {};

          await axios
            .get(BACKEND_URL + `/users/user/${invite.senderId}`) // TODO:Test this
            .then((response) => {
              console.log("Userdata: ", response.data);
              currentInvite.senderUsername = response.data.username;
              currentInvite.kind = invite.kind;
              currentInvite.status = invite.status;

              invitesArray.push(currentInvite);
            })
            .catch((error) => {
              console.log("Error in InvitesList.jsx axios call: ", error);
            });
        });

        console.log("invitesArray: ", invitesArray);

        return invitesArray;
      })
      .catch((error) => {
        console.log("Error in InvitesList.jsx axios call: ", error);
      });
  };

  useEffect(() => {
    const fetchInvites = async () => {
      const data = await getInvites();
      console.log("data: ", data);
      setInvites(data);
    };
    fetchInvites();
    console.log("useEffect");
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-4">
        <table className="w-1/2 border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md w-[350px]">
                From
              </th>
              <th className="border border-slate-600 rounded-md pl-3">Kind</th>
              <th className="border border-slate-600 rounded-md pl-3">
                Status
              </th>
              {/* max-md:hidden hides this column on mobile devices and tablets */}
              <th className="border border-slate-600 rounded-md w-[180px]">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {console.log("Invites in JSX", invites)}
            {invites.map((invite) => (
              <tr>
                {console.log("Invite in JSX", invite)}
                <td>
                  <span className="text-xl mr-4 text-gray-500">
                    &#64;{invite.senderUsername}
                  </span>
                </td>
                <td>
                  <span className="text-xl mr-4 text-gray-500">
                    {invite.kind}
                  </span>
                </td>
                <td>
                  <span className="text-xl mr-4 text-gray-500">
                    {invite.status}
                  </span>
                </td>
                <td>
                  <span className="text-xl mr-4 text-gray-500">
                    <button>Accept</button>
                    <button>Decline</button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvitesList;

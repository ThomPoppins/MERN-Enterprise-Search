import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getPendingRecievedInvites } from '../../utils/invites/recievedInvitesUpdater'
import axios from 'axios'
import InviteOperations from '../../components/invites/InviteOperations'
import Layout from '../../components/layout/Layout'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const InvitesList = () => {
  // The invites in the list
  const [invites, setInvites] = useState([])

  // Navigation to other routes
  const navigate = useNavigate()

  //  Get userId state from Redux store
  const userId = useSelector((state) => state.userId)
  //  Get user state from Redux store
  const user = useSelector((state) => state.user)

  // Get pending recieved invites from Redux store
  const pendingRecievedInvites = useSelector(
    //
    (state) => state.pendingRecievedInvites,
  )

  useEffect(() => {
    // getPendingInvites();
    getPendingRecievedInvites()
  }, [user, userId])

  useEffect(() => {
    setInvites(pendingRecievedInvites)
  }, [pendingRecievedInvites])

  // ! STATUS STATES: "pending", "accepted", "declined" and "canceled"
  const updateInviteStatus = async (inviteId, newStatus) => {
    const response = await axios.put(
      `${BACKEND_URL}/invites/status/${inviteId}`,
      {
        status: newStatus,
      },
    )

    console.log('Update invite status response: ', response)

    Promise.resolve(getPendingRecievedInvites())
      .then((value) => {
        console.log('InvitesList.jsx updateInviteStatus value: ', value)

        setTimeout(() => {
          //
          const filteredPendingRecievedInvites = pendingRecievedInvites.filter(
            (invite) => invite._id !== inviteId,
          )

          if (filteredPendingRecievedInvites.length === 0) {
            navigate('/companies')
            return
          }

          setInvites(filteredPendingRecievedInvites)
        }, 1000)

        // Filter out the invite that was updated
        //
      })
      .catch(() => {
        console.log(`No pending invites.`)
      })
  }

  return (
    <Layout>
      <div className='mt-4 flex justify-center'>
        <table className='border-spacing-2 w-3/4 border-separate'>
          <thead>
            <tr>
              <th className='bg-violet-950/80 w-[400px] rounded-md border-4 border-purple-900'>
                From
              </th>
              <th className='bg-violet-950/80 rounded-md border-4 border-purple-900 pl-3'>
                Kind
              </th>
              <th className='bg-violet-950/80 w-[175px] rounded-md border-4 border-purple-900 pl-3'>
                Status
              </th>
              {/* max-md:hidden hides this column on mobile devices and tablets */}
              <th className='bg-violet-950/80 w-[180px] rounded-md border-4 border-purple-900'>
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log("Invites in JSX", invites)} */}
            {invites?.map((invite) => (
              <tr
                id={`invite-row-${invite._id}`}
                //
                key={invite._id}
              >
                <td className='bg-violet-950/40 border-purple-900'>
                  <img
                    alt='profile'
                    className='float-left mr-4 rounded-full'
                    height='50'
                    src={invite.sender.profilePictureURL}
                    width='50'
                  />
                  <div className='flex flex-col'>
                    <div>
                      <span className='mr-4'>
                        {
                          //
                          invite.sender.firstName
                        }{' '}
                        {/*  */}
                        {invite.sender.lastName}
                      </span>
                    </div>
                    <div>
                      <span className='mr-4 text-blue-400'>
                        {/*  */}
                        &#64;{invite.sender.username}
                      </span>
                    </div>
                  </div>
                </td>
                <td className='bg-violet-950/40 border-purple-900'>
                  <span className='mr-4'>
                    {/*  */}
                    {invite.kind === 'company_ownership' ? (
                      <span>
                        Invited for co-ownership of
                        <strong>{invite.company.name}</strong>
                      </span>
                    ) : invite.kind === 'friend_request' ? (
                      <span>Friend Request</span>
                    ) : (
                      <span className='font-bold text-red-600'>
                        ERROR: Invite kind is unknown!
                      </span>
                    )}
                  </span>
                </td>
                <td className='bg-violet-950/40 border-purple-900'>
                  {/*  */}
                  <span className='mr-4'>{invite.status}</span>
                </td>
                <td className='bg-violet-950/40 border-purple-900'>
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
  )
}

export default InvitesList

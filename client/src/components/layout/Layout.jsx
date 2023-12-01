import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react'
import { getPendingRecievedInvites } from '../../utils/invites/recievedInvitesUpdater'
import { useSelector } from 'react-redux'

const Layout = ({ children }) => {
  // Get userId state from Redux store
  //
  const userId = useSelector((state) => state.userId)

  // Get the pending invites for the user
  useEffect(() => {
    if (!userId) {
      return
    }

    return () => {
      // Get the pending invites for the user
      getPendingRecievedInvites(userId)
    }
  }, [userId])

  return (
    <div className='outer-div min-h-screen'>
      <Navbar />
      <div className='mx-auto md:w-10/12'>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout

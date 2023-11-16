import { HiOutlineCog, HiOutlineLogout, HiUser } from 'react-icons/hi'
import { LuClipboardCheck, LuClipboardList } from 'react-icons/lu'
import React, { useEffect, useState, useRef } from 'react'
import { BACKEND_URL } from '../../../config'
import { HiOutlineBriefcase } from 'react-icons/hi2'
import { getPendingRecievedInvites } from '../../utils/invites/recievedInvitesUpdater'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  //
  const userId = useSelector((state) => state.userId),
    //
    user = useSelector((state) => state.user),
    // The pending invites for the active user
    pendingRecievedInvites = useSelector(
      //
      (state) => state.pendingRecievedInvites,
    ),
    // Should the active user be alerted about pending invites? (true/false)
    [inviteAlert, setInviteAlert] = useState(false),
    // Is the dropdown menu open?
    [isDropdownOpen, setIsDropdownOpen] = useState(false),
    // Toggle the dropdown menu open/closed
    toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen)
    },
    // UseRef is used to detect clicks outside the dropdown menu
    dropdownRef = useRef(null)

  // When the pending invites are available
  useEffect(() => {
    // Return if no pending invites or userId is available
    if (!pendingRecievedInvites || !userId) {
      return
    }
    // Check if the user has pending invites
    const hasPendingInvites =
      pendingRecievedInvites && pendingRecievedInvites.length > 0
    // Set the invite alert state to true/false based on if the user has pending invites
    setInviteAlert(hasPendingInvites)
  }, [user, userId, pendingRecievedInvites])

  // Get pending recieved invites every 5 seconds
  useEffect(() => {
    // Return if no userId is available
    if (!userId) {
      return
    }
    // Get pending recieved invites every 5 seconds
    const interval = setInterval(() => {
      getPendingRecievedInvites(userId)
      //! Increase interval time if the performance has become an issue
    }, 5000)
    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval)
  }, [userId])

  // Listen for clicks outside the dropdown menu and close it if it's open
  useEffect(() => {
    const handleClickOutside = (event) => {
      //  If the dropdownRef is set to the dropdown menu, and the click is outside the dropdown menu. (dropdownRef.current will be null if no dropdown menu is open)
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    // Bind the event listener to the "mousedown" event and execute handleClickOutside() when it fires
    window.addEventListener('mousedown', handleClickOutside)

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className='bg-gradient-to-r from-violet-950 to-purple-950 p-4 shadow-lg'>
      <div className='container mx-auto'>
        <img
          alt='Vind-Expert logo'
          className='w-7 h-7 mt-1 rounded-xs float-left object-cover mr-2'
          src={`${BACKEND_URL}/logo/vind-expert-transparent.png`}
        />
        <div className='flex justify-between items-center'>
          <div className='text-white'>
            <Link to='/'>
              <h1 className=' text-2xl font-bold'>Vind-Expert</h1>
            </Link>
          </div>
          <div className='flex space-x-4'>
            {userId ? (
              <div>
                <div className='flex items-center space-x-2'>
                  <div className='relative'>
                    <div
                      className='text-white cursor-pointer'
                      data-testid='user-dropdown'
                      onClick={toggleDropdown}
                      onKeyDown={(event) => {
                        if (event.key === 'm') {
                          toggleDropdown()
                        }
                      }}
                      role='button'
                      tabIndex={0}
                    >
                      <img
                        alt='profile'
                        className='w-8 h-8 rounded-full ml-2 float-left mr-3 object-cover'
                        src={
                          user?.profilePictureURL
                            ? user?.profilePictureURL
                            : `${BACKEND_URL}/placeholders/profile-picture-placeholder-man.jpeg`
                        }
                      />
                      {user?.firstName}
                      {inviteAlert ? (
                        <LuClipboardList className='text-xl mt-1 w-[30px] float-right ml-1 mr-3 text-yellow-400 animate-waving-button' />
                      ) : (
                        <LuClipboardCheck className='text-xl mt-1 w-[30px] float-right ml-1 mr-3 text-green-400' />
                      )}
                    </div>
                    {isDropdownOpen ? (
                      <div
                        className='z-[100] absolute top-10 right-0 bg-violet-950/90 rounded-lg py-4'
                        ref={dropdownRef}
                      >
                        {inviteAlert ? (
                          <div className='w-[200px] pt-1 h-10 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 mt-1 bg-gradient-to-r from-green-600 to-green-800'>
                            <Link className='text-white ' to='/invites'>
                              {inviteAlert ? (
                                <div className='w-full h-full'>
                                  <LuClipboardList className='text-xl w-[30px] float-left ml-2 mt-[-2px] mr-3 text-yellow-400 animate-waving-button' />
                                  <div className='animate-bounce mt-2'>
                                    Invites
                                  </div>
                                </div>
                              ) : (
                                ''
                              )}
                            </Link>
                          </div>
                        ) : (
                          ''
                        )}

                        <div
                          className={`w-[200px] pt-1 h-8 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 ${
                            inviteAlert ? 'mt-4 pt-1' : ''
                          }}}`}
                        >
                          <Link className='text-white' to='/profile'>
                            <div className='w-full h-full'>
                              <HiUser className='text-xl mt-1 w-[30px] float-left ml-2 mr-3' />
                              Profile
                            </div>
                          </Link>
                        </div>

                        <div className='w-[200px] pt-1 h-8 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 mt-4'>
                          <Link className='text-white' to='/companies'>
                            <div className='w-full h-full'>
                              <HiOutlineBriefcase className='text-xl mt-1 w-[30px] float-left ml-2 mr-3' />
                              Companies
                            </div>
                          </Link>
                        </div>
                        <div className='w-[200px] pt-1 h-8 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 mt-4'>
                          <Link className='text-white' to='/user/settings'>
                            <div className='w-full h-full'>
                              <HiOutlineCog className='text-xl mt-1 w-[30px] float-left ml-2 mr-3' />
                              Settings
                            </div>
                          </Link>
                        </div>
                        <div className='w-[200px] pt-1 h-8 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 mt-4'>
                          <Link className='text-white' to='/logout'>
                            <div className='w-full h-full'>
                              <HiOutlineLogout className='text-xl mt-1 w-[30px] float-left ml-2 mr-3' />
                              Logout
                            </div>
                          </Link>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex items-center space-x-2'>
                <Link className='text-white' to='/login'>
                  Login
                </Link>
                <Link className='text-white' to='/register'>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

import { HiOutlineCog, HiOutlineLogout, HiUser } from 'react-icons/hi'
import { LuClipboardCheck, LuClipboardList } from 'react-icons/lu'
import React, { useEffect, useState, useRef } from 'react'
import { HiOutlineBriefcase } from 'react-icons/hi2'
import { getPendingRecievedInvites } from '../../utils/invites/recievedInvitesUpdater'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

console.log('BACKEND_URL: ', BACKEND_URL)

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
    <nav className='from-violet-950 to-purple-950 bg-gradient-to-r p-4 shadow-lg'>
      <div className='container mx-auto'>
        <img
          alt="Best-Pro's logo"
          className='rounded-xs float-left mr-2 mt-1 h-7 w-7 object-cover'
          src={`${BACKEND_URL}/logo/find-best-pro-transparent.png`}
        />
        <div className='flex items-center justify-between'>
          <div className='text-white'>
            <Link to='/'>
              <h1 className=' text-2xl font-bold'>Best-Pro&apos;s</h1>
            </Link>
          </div>
          <div className='flex space-x-4'>
            {userId ? (
              <div>
                <div className='flex items-center space-x-2'>
                  <div className='relative'>
                    <div
                      className='cursor-pointer text-white'
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
                        className='float-left ml-2 mr-3 h-8 w-8 rounded-full object-cover'
                        src={
                          user?.profilePictureURL
                            ? `${BACKEND_URL}${user?.profilePictureURL}`
                            : `${BACKEND_URL}/placeholders/profile-picture-placeholder-man.jpeg`
                        }
                      />
                      {user?.firstName}
                      {inviteAlert ? (
                        <LuClipboardList className='animate-waving-button float-right ml-1 mr-3 mt-1 w-[30px] text-xl text-yellow-400' />
                      ) : (
                        <LuClipboardCheck className='float-right ml-1 mr-3 mt-1 w-[30px] text-xl text-green-400' />
                      )}
                    </div>
                    {isDropdownOpen ? (
                      <div
                        className='bg-violet-950/90 absolute right-0 top-10 z-[100] rounded-lg py-4'
                        ref={dropdownRef}
                      >
                        {inviteAlert ? (
                          <div className='mt-1 h-10 w-[200px] bg-gradient-to-r from-green-600 to-green-800 pt-1 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600'>
                            <Link className='text-white ' to='/invites'>
                              {inviteAlert ? (
                                <div className='h-full w-full'>
                                  <LuClipboardList className='animate-waving-button float-left ml-2 mr-3 mt-[-2px] w-[30px] text-xl text-yellow-400' />
                                  <div className='mt-2 animate-bounce'>
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
                          className={`h-8 w-[200px] pt-1 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 ${
                            inviteAlert ? 'mt-4 pt-1' : ''
                          }}}`}
                        >
                          <Link className='text-white' to='/profile'>
                            <div className='h-full w-full'>
                              <HiUser className='float-left ml-2 mr-3 mt-1 w-[30px] text-xl' />
                              Profile
                            </div>
                          </Link>
                        </div>

                        <div className='mt-4 h-8 w-[200px] pt-1 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600'>
                          <Link className='text-white' to='/companies'>
                            <div className='h-full w-full'>
                              <HiOutlineBriefcase className='float-left ml-2 mr-3 mt-1 w-[30px] text-xl' />
                              Companies
                            </div>
                          </Link>
                        </div>
                        <div className='mt-4 h-8 w-[200px] pt-1 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600'>
                          <Link className='text-white' to='/user/settings'>
                            <div className='h-full w-full'>
                              <HiOutlineCog className='float-left ml-2 mr-3 mt-1 w-[30px] text-xl' />
                              Settings
                            </div>
                          </Link>
                        </div>
                        <div className='mt-4 h-8 w-[200px] pt-1 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600'>
                          <Link className='text-white' to='/logout'>
                            <div className='h-full w-full'>
                              <HiOutlineLogout className='float-left ml-2 mr-3 mt-1 w-[30px] text-xl' />
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
                <Link className='text-white' to='/sign-up'>
                  Sign Up
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

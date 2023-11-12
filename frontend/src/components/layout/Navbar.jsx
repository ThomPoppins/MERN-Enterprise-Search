// Navbar.tsx
import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../../config';
import { getPendingRecievedInvites } from '../../utils/invites/recievedInvitesUpdater';
import {
  HiOutlineClipboard,
  HiOutlineClipboardCheck,
  HiOutlineClipboardCopy,
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineLogout,
  HiUser,
} from 'react-icons/hi'; // ! TODO: Remove unused icons
import { HiOutlineBriefcase } from 'react-icons/hi2';
import {
  LuBell,
  LuBellRing,
  LuClipboardCheck,
  LuClipboardCopy,
  LuClipboardList,
} from 'react-icons/lu'; // ! TODO: Remove unused icons
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  // @ts-ignore
  const userId = useSelector((state) => state.userId);
  // @ts-ignore
  const user = useSelector((state) => state.user);

  const pendingRecievedInvites = useSelector(
    // @ts-ignore
    (state) => state.pendingRecievedInvites,
  );

  // Should the active user be alerted about pending invites?
  // ! DECIDE: Maybe ALL notifications should trigger a general notification state, maybe not.
  const [inviteAlert, setInviteAlert] = useState(false);

  // When the pending invites are available
  useEffect(() => {
    if (!pendingRecievedInvites || !userId) {
      return;
    }

    // Set the amount of pending invites
    pendingRecievedInvites === null
      ? setInviteAlert(false)
      : pendingRecievedInvites.length > 0
      ? setInviteAlert(true)
      : setInviteAlert(false);
  }, [user, userId, pendingRecievedInvites]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    // Get pending recieved invites every 30 seconds
    const interval = setInterval(() => {
      getPendingRecievedInvites(userId);
    }, 30000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [userId]);

  // Is the dropdown menu open?
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle the dropdown menu open/closed
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
                      data-test-id='user-dropdown'
                      onClick={toggleDropdown}
                    >
                      <img
                        alt='profile picture'
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
                    {/* TODO: [MERNSTACK-226] When you click somewhere else, the dropdown should close in Navbar.jsx*/}
                    {isDropdownOpen ? <div className='z-[100] absolute top-10 right-0 bg-violet-950/90 rounded-lg py-4'>
                        {inviteAlert ? (
                          <div className='w-[200px] pt-1 h-10 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 mt-1 bg-gradient-to-r from-green-600 to-green-800'>
                            <Link className='text-white ' to='/invites'>
                              {inviteAlert ? (
                                <div className='w-full h-full'>
                                  <LuClipboardList className='text-xl w-[30px] float-left ml-2 mt-[-2px] mr-3 text-yellow-400 animate-waving-button' />
                                  <div className='animate-bounce mt-2'>Invites</div>
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
                      </div> : null}
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
  );
};

export default Navbar;

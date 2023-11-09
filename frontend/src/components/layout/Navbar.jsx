// Navbar.tsx
import React from "react";
import { BACKEND_URL } from "../../../config";
import {
  HiOutlineClipboardList,
  HiOutlineClipboard,
  HiOutlineClipboardCopy,
  HiOutlineClipboardCheck,
  HiUser,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  let userId = useSelector((state) => state.userId);
  let user = useSelector((state) => state.user);

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-violet-950 to-purple-950 p-4 shadow-lg">
      <div className="container mx-auto">
        <img
          src={`${BACKEND_URL}/logo/vind-expert.png`}
          alt="Vind-Expert logo"
          className="w-7 h-7 mt-1 rounded-xs float-left object-cover mr-2"
        />
        <div className="flex justify-between items-center">
          <div className="text-white">
            <Link to="/">
              <h1 className=" text-2xl font-bold">Vind-Expert</h1>
            </Link>
          </div>

          <div className="flex space-x-4">
            {userId ? (
              <div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div
                      className="text-white cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      <img
                        src={
                          user?.profilePictureURL
                            ? user?.profilePictureURL
                            : `${BACKEND_URL}/placeholders/profile-picture-placeholder-man.jpeg`
                        }
                        alt="profile picture"
                        className="w-8 h-8 rounded-full ml-2 float-left mr-2 object-cover"
                      />
                      {user?.firstName} {user?.lastName}
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute top-10 right-0 bg-violet-950/90 rounded-lg p-2 animate-pulse">
                        <div className="w-[200px] pl-4">
                          <Link to="/profile" className="text-white">
                            <HiUser className="text-xl mt-1 w-[30px] float-left mr-3" />
                            Profile
                          </Link>
                        </div>
                        <div className="w-[200px] pl-4">
                          <Link to="/invites" className="text-white">
                            <HiOutlineClipboardList className="text-xl mt-1 w-[30px] float-left mr-3" />
                            Invites
                          </Link>
                        </div>
                        <div className="w-[200px] pl-4">
                          <Link to="/companies" className="text-white">
                            <HiOutlineBriefcase className="text-xl mt-1 w-[30px] float-left mr-3" />
                            Companies
                          </Link>
                        </div>
                        <div className="w-[200px] pl-4">
                          <Link to="/user/settings" className="text-white">
                            <HiOutlineCog className="text-xl mt-1 w-[30px] float-left mr-3" />
                            Settings
                          </Link>
                        </div>
                        <div className="w-[200px] pl-4">
                          <Link to="/logout" className="text-white">
                            <HiOutlineLogout className="text-xl mt-1 w-[30px] float-left mr-3" />
                            Logout
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-white">
                  Login
                </Link>
                <Link to="/register" className="text-white">
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

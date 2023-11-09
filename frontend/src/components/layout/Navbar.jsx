// Navbar.tsx
import React from "react";
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
        <div className="flex justify-between items-center">
          <div className="text-white">
            <Link to="/">
              <h1 className=" text-2xl font-bold">Vind Expert</h1>
            </Link>
          </div>

          {userId && (
            <div className="flex space-x-4">
              <div className="text-white">
                <Link to="/companies">Companies</Link>
              </div>
              <div className="text-white">
                <Link to="/invites">Invites</Link>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            {userId ? (
              <div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div
                      className="text-white cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      {user?.profilePictureURL && (
                        <img
                          src={user?.profilePictureURL}
                          alt="profile picture"
                          className="w-8 h-8 rounded-full ml-2"
                        />
                      )}
                      <div className="text-white">
                        {user?.firstName} {user?.lastName}
                      </div>
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute top-10 right-0 bg-violet-950/90 rounded-lg p-2">
                        <div className="w-[200px] pl-4">
                          <Link to="/user/profile" className="text-white">
                            Profile
                          </Link>
                        </div>
                        <div className="w-[200px] pl-4">
                          <Link to="/user/settings" className="text-white">
                            Settings
                          </Link>
                        </div>
                        <div className="w-[200px] pl-4">
                          <Link to="/logout" className="text-white">
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

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiPencil } from "react-icons/bi";
import {
  FEMALE_PROFILE_PICTURE_PLACEHOLDER_URL,
  MALE_PROFILE_PICTURE_PLACEHOLDER_URL,
} from "../../../config";
import { BACKEND_URL } from "../../../config";
import Layout from "../../components/layout/Layout";
import EditProfilePictureModal from "../../components/users/EditProfilePictureModal";

const UserProfile = () => {
  let userId = useSelector((state) => state.userId);
  let user = useSelector((state) => state.user);

  // Placeholder for profile picture dependent on gender
  const [profilePicturePlaceholderURL, setProfilePicturePlaceholderURL] =
    useState("");

  useEffect(() => {
    if (!user) return;

    if (user.gender === "Woman") {
      setProfilePicturePlaceholderURL(
        `${BACKEND_URL}${FEMALE_PROFILE_PICTURE_PLACEHOLDER_URL}`
      );
    } else {
      setProfilePicturePlaceholderURL(
        `${BACKEND_URL}${MALE_PROFILE_PICTURE_PLACEHOLDER_URL}`
      );
    }
    console.log("user", user);
  }, [user]);

  const [showEditProfilePictureModal, setShowEditProfilePictureModal] =
    useState(false);

  const handleEditProfilePicture = () => {
    setShowEditProfilePictureModal(true);
  };

  return (
    <Layout>
      <div className="mx-auto p-5">
        <div className="relative w-[320px] mx-auto">
          <img
            src={
              user?.profilePictureURL
                ? user?.profilePictureURL
                : profilePicturePlaceholderURL
            }
            alt="profile picture"
            className="w-64 h-64 mt-2 rounded-full mx-auto object-cover"
          />
          <div
            className="absolute bottom-3 right-6 bg-purple-600 pl-1 pr-2 flex items-center border-2 border-purple-900 rounded-lg cursor-pointer hover:bg-purple-700"
            onClick={handleEditProfilePicture}
          >
            <BiPencil className="float-left text-gray mr-1" />
            {user?.profilePictureURL ? "Edit" : "Upload"}
          </div>
        </div>

        <div className="mx-auto lg:w-9/12 border border-purple-900 bg-violet-950/40 rounded-xl p-4 mt-6">
          <h1 className="text-3xl my-2">
            {user?.firstName} {user?.lastName}
          </h1>

          <p className="text-blue-400 text-sm">
            {user ? "@" + user?.username : ""}
          </p>

          <div className="mx-auto mt-4 mb-3">
            {!user?.profilePictureURL && (
              <div className="flex space-x-2 text-xl ">
                <p>
                  You haven't set a profile picture yet!{" "}
                  <span
                    onClick={handleEditProfilePicture}
                    className="hover:text-green-400 text-blue-400 cursor-pointer"
                  >
                    Upload yours now!
                  </span>
                </p>
              </div>
            )}

            <div className="flex space-x-2">
              <p className="text-gray-400">Email:</p>
              <p>{user?.email}</p>
            </div>
            <p className="">
              Visit the Companies link in the navigation bar to see some of this
              this application's features in action.
            </p>
          </div>
        </div>
      </div>
      {showEditProfilePictureModal && (
        <EditProfilePictureModal
          userId={userId}
          onClose={() => setShowEditProfilePictureModal(false)}
        />
      )}{" "}
    </Layout>
  );
};

export default UserProfile;

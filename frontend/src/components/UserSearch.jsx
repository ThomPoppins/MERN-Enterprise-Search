import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import { VscMention, VscPerson, VscMail } from "react-icons/vsc";
import { useSelector } from "react-redux";

const UserSearch = ({
  companyId,
  addPendingOwnershipInvite,
  usersResult,
  setUsersResult,
  removedOwnersIds,
}) => {
  let userId = useSelector((state) => state.userId);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    searchUsers(e.target.value);

    console.log(
      "handleSearch e.target.value in UserSearch.jsx: ",
      e.target.value
    );
  };

  const searchUsers = (searchTerm) => {
    axios
      .get(BACKEND_URL + "/users/search/" + searchTerm, {
        headers: {
          companyid: companyId,
        },
      })
      .then((response) => {
        setUsersResult(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(
          "ERROR in UserSearch.jsx get search results API call: ",
          error
        );
      });
  };

  //! Maybe deprecated useEffect hook below
  // Remove owner from search results if they are already an owner, but when they are removed from the company they should be able to be added again
  useEffect(() => {
    // removedOwnersIds is an array of owner ids that have been removed from the company
    removedOwnersIds.forEach((removedOwnerId) => {
      // Get the user object for every the removed owner
      axios
        .get(BACKEND_URL + "/users/user/" + removedOwnerId)
        .then((response) => {
          // Add the from the company removed owner back to the search results
          const newUsersResult = [...usersResult, response.data];

          console.log("newUsersResult: ", newUsersResult); //! TODO: Remove console.log

          // Add the removed owner back to the search results
          setUsersResult(newUsersResult);
        })
        .catch((error) => {
          console.log(
            "ERROR in UserSearch.jsx get from company removed owner user data: ",
            error
          );
        });
    });
  }, [removedOwnersIds]);
  //! End of maybe deprecated useEffect hook

  return (
    <div>
      <div className="my-4">
        <label className="text-xl mr-4">
          Search user to add as company owner:
        </label>
        <div className="my-4">
          <p className="text-gray-300">
            <strong>Note:</strong> Register more accounts if you want results,
            search query will match on username, first name, last name and
            email.
          </p>
        </div>

        <input
          type="text"
          value={searchTerm}
          // onChange is a function that takes an event as an argument
          // and sets the title state to the value of the input
          // e.target.value is the value of the input
          onChange={handleSearch}
          className="border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full"
          data-test-id="search-input"
        />
      </div>
      <ul>
        {usersResult.map((userResult, index) => (
          <div
            key={userResult._id + index}
            className="search-result flex border-sky-400 rounded-xl mx-auto justify-between items-center"
          >
            <div className="mb-4">
              <li>
                <VscMention className="inline" />
                {userResult.username} <br />
                <VscPerson className="inline" /> {userResult.firstName}{" "}
                {userResult.lastName} <br />
                <VscMail className="inline" /> {userResult.email}
              </li>
            </div>
            <div>
              <button
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l px-4 py-1 rounded-lg mx-auto mb-4"
                value={userResult._id}
                onClick={addPendingOwnershipInvite}
                data-test-id="invite-owner-button"
              >
                Invite
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;

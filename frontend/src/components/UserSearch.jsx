import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";
import { VscMention, VscPerson, VscMail } from "react-icons/vsc";
import { useSelector } from "react-redux";

const UserSearch = ({
  companyId,
  handleAddUserAsCompanyOwner,
  removedOwnersIds,
}) => {
  let userId = useSelector((state) => state.userId);
  let user = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [usersResult, setUsersResult] = useState([]);

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

  // Remove owner from search results if they are already an owner, but when they are removed from the company they should be able to be added again
  useEffect(() => {
    // removedOwnersIds is an array of owner ids that have been removed from the company
    removedOwnersIds.forEach((removedOwnerId) => {
      toast.info("Removed owner id: " + removedOwnerId);

      // Get the user object for every the removed owner
      axios
        .get(BACKEND_URL + "/users/user/" + removedOwnerId)
        .then((response) => {
          // Add the from the company removed owner back to the search results
          const newUsersResult = [...usersResult, response.data];

          console.log("newUsersResult: ", newUsersResult); //! TODO: Remove console.log

          // Add the removed owner back to the search results
          setUsersResult(newUsersResult);

          toast.success("Added back removed owner: " + removedOwnerId);
        })
        .catch((error) => {
          toast.error(
            "Error adding back removed owner to search results: " +
              removedOwnerId
          );
          console.log(
            "ERROR in UserSearch.jsx get from company removed owner user data: ",
            error
          );
        });
    });
  }, [removedOwnersIds]);

  //! TODO: Remove deprecated add owner functionality below
  // const handleAddOwner = (e) => {
  //   e.preventDefault();
  //   handleAddUserAsCompanyOwner(e.target.value);

  //   const newUsersResult = usersResult.filter(
  //     (user) => user._id !== e.target.value
  //   );
  //   setUsersResult(newUsersResult);
  // };
  //! End of deprecated add owner functionality

  // Invite owner functionality
  const inviteOwner = (e) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Get the id of the user to be invited as an owner
    const invitedOwnerId = e.target.value;

    // Make an API call to invite the user as an owner
    axios
      .post(BACKEND_URL + "/invites", {
        senderId: userId,
        receiverId: invitedOwnerId,
        companyId: companyId,
        kind: "company_ownership",
        status: "pending",
      })
      .then((response) => {
        //! TODO: Remove console.log
        console.log(
          "UserSearch.jsx response.data invite ownership: ",
          response.data
        );

        // Remove the invited owner from the search results
        const newUsersResult = usersResult.filter(
          (user) => user._id !== invitedOwnerId
        );
        // Update the search results
        setUsersResult(newUsersResult);
      })
      .catch((error) => {
        //! TODO: Remove console.log and replace with a toast
        console.log(
          "ERROR in UserSearch.jsx invite owner API call: ",
          error.response.data
        );
      });
  };

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
        {usersResult.map((user, index) => (
          <div
            key={user._id + index}
            className="search-result flex border-sky-400 rounded-xl mx-auto justify-between items-center"
          >
            <div className="mb-4">
              <li>
                <VscMention className="inline" />
                {user.username} <br />
                <VscPerson className="inline" /> {user.firstName}{" "}
                {user.lastName} <br />
                <VscMail className="inline" /> {user.email}
              </li>
            </div>
            <div>
              {/* //!Replace this add owner functionality with invite owner functionality */}
              {/* <button
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l px-4 py-1 rounded-lg mx-auto mb-4"
                value={user._id}
                onClick={handleAddOwner}
                data-test-id="add-owner-button"
              >
                Add
              </button> */}
              {/* //! End of to be deleted add owner functionality */}

              <button
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l px-4 py-1 rounded-lg mx-auto mb-4"
                value={user._id}
                onClick={inviteOwner}
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

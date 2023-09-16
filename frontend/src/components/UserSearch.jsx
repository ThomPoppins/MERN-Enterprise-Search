import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import { VscMention, VscPerson, VscMail } from "react-icons/vsc";

const UserSearch = ({
  companyId,
  handleAddUserAsCompanyOwner,
  removedOwnersIds,
}) => {
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

  useEffect(() => {
    removedOwnersIds.forEach((removedOwnerId) => {
      axios
        .get(BACKEND_URL + "/users/user/" + removedOwnerId)
        .then((response) => {
          const newUsersResult = [...usersResult, response.data];
          console.log("newUsersResult: ", newUsersResult);
          setUsersResult(newUsersResult);
        })
        .catch((error) => {
          console.log(
            "ERROR in UserSearch.jsx get removed owner API call: ",
            error
          );
        });
    });
  }, [removedOwnersIds]);

  const handleAddOwner = (e) => {
    e.preventDefault();
    handleAddUserAsCompanyOwner(e.target.value);

    // TODO: [MERNSTACK-184] Remove item from search results when added
    const newUsersResult = usersResult.filter(
      (user) => user._id !== e.target.value
    );
    setUsersResult(newUsersResult);
  };

  return (
    <div>
      <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">
          Search user to add as company owner:
        </label>
        <div className="my-4">
          <p className="text-gray-400">
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
          className="border-2 border-gray-500 px-4 py-2 w-full"
        />
      </div>
      <ul>
        {usersResult.map((user) => (
          <div
            key={user._id}
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
              <button
                className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg mx-auto mb-4"
                value={user._id}
                onClick={handleAddOwner}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;

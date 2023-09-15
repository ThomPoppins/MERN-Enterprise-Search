import React, { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../config.js";
import { useSnackbar } from "notistack";
import phoneNumberValidator from "../../validation/phoneNumberValidator";
import emailValidator from "../../validation/emailValidator";
import startYearValidator from "../../validation/startYearValidator";
import UserSearch from "../../components/UserSearch";
import { VscMention, VscPerson, VscMail } from "react-icons/vsc";

const EditCompany = () => {
  // ADD OWNERS TO COMPANY TICKETS:
  // TODO: [MERNSTACK-172] In the <EditCompany /> component, add a button that opens the <UserSearch /> component when clicked. You can use the useState() hook to create a state variable that controls whether the <UserSearch /> component is visible or not.
  // TODO: [MERNSTACK-174] When the user selects a user to add as an owner to the company, update the owners state variable in the <EditCompany /> component to include the selected user. You can use the setOwners() function to update the owners state variable.
  // TODO: [MERNSTACK-175] When the user saves the changes to the company, make an API call to your backend to update the company with the new owners.
  // TODO: [MERNSTACK-168] Make possible for user (owner) to add other owners to the company by finding other users and adding them to the company

  // TODO: [MERNSTACK-129] Add state for all companies fields that can be edited
  const { id } = useParams();
  const companyId = id;
  const [company, setCompany] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [owners, setOwners] = useState([]);
  const [startYear, setStartYear] = useState(0);

  // Display a spinner when loading data from the backend
  const [loading, setLoading] = useState(false);

  // useNavigate is a hook that allows us to navigate to a different page
  const navigate = useNavigate();

  // useSnackbar is a hook that returns an object with two properties: enqueueSnackbar and closeSnackbar
  // enqueueSnackbar is a function that takes an object as an argument
  // and displays a snackbar with the message and the variant that we pass in the object
  // closeSnackbar is a function that takes an id as an argument and closes the snackbar with that id
  // https://iamhosseindhv.com/notistack/demos#use-snackbar
  const { enqueueSnackbar } = useSnackbar();

  // useEffect() is a hook that runs a function when the component is rendered
  useEffect(() => {
    setLoading(true);
    axios
      .get(BACKEND_URL + "/companies/" + id)
      .then((response) => {
        setLoading(false);
        setCompany(response.data);
        // TODO: [MERNSTACK-131] Set state for all companies fields that can be edited
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setStartYear(response.data.startYear);
        // Put all userIds of the owners in an array
        const userIds = [];
        response.data.owners.forEach((owner) => {
          userIds.push(owner.userId);
        });

        console.log("userIds: ", userIds);

        const ownerPromises = userIds.map((userId) => {
          return axios.get(BACKEND_URL + "/users/user/" + userId);
        });

        Promise.all(ownerPromises)
          .then((responses) => {
            const ownersData = responses.map((response) => response.data);
            setOwners(ownersData);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        alert("Error fetching company, please check the console.");
        console.log(error);
      });
  }, []);

  // handleEditCompany is a function that sends a PUT request to the backend to update a company
  const handleEditCompany = () => {
    let invalidValues = false;

    if (companyNameValidator(name) === false) {
      enqueueSnackbar("Invalid company name!", { variant: "error" });
      console.log("Invalid company name" + name);
      invalidValues = true;
    }

    if (emailValidator(email) === false) {
      enqueueSnackbar("Invalid email!", { variant: "error" });
      console.log("Invalid email" + email);
      invalidValues = true;
    }

    if (phoneNumberValidator(phone, "NL") === false) {
      enqueueSnackbar("Invalid phone number!", { variant: "error" });
      console.log("Invalid phone number" + phone);
      invalidValues = true;
    }

    if (startYearValidator(startYear) === false) {
      enqueueSnackbar("Invalid start year!", { variant: "error" });
      console.log("Invalid start year" + startYear);
      invalidValues = true;
    }

    if (invalidValues) {
      return;
    }

    const data = {
      name: name,
      email: email,
      phone: phone,
      startYear: startYear,
    };
    setLoading(true);
    axios
      .put(BACKEND_URL + `/companies/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Company edited successfully!", { variant: "success" });
        navigate("/companies");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error editing company!", { variant: "error" });
        console.log(error);
      });
  };

  const handleAddUserAsCompanyOwner = (userId) => {
    console.log("handleAddUserAsCompanyOwner userId: " + userId);
    axios
      .put(BACKEND_URL + "/companies/" + companyId + "/add-owner/" + userId)
      .then((response) => {
        console.log(
          "handleAddUserAsCompanyOwner response.data: ",
          response.data
        );
        console.log(
          "handleAddUserAsCompanyOwner response.data.owners: ",
          response.data.owners
        );

        const userIds = [];
        response.data.owners.forEach((owner) => {
          userIds.push(owner.userId);
        });

        const ownerPromises = userIds.map((userId) =>
          axios.get(BACKEND_URL + "/users/user/" + userId)
        );

        Promise.all(ownerPromises)
          .then((responses) => {
            const ownersData = responses.map((response) => response.data);
            console.log("ownersData: ", ownersData);
            setOwners(ownersData);
          })
          .catch((error) => {
            console.log(error);
          });
        setCompany(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination={"/companies"} />
      <h1 className="text-3xl my-4">Edit Company</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {/* TODO: [MERNSTACK-130] Add input fields for all editable company details. To achieve this, copy the outer div with class ".my-4". */}
        {/* Comany Name input field */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            // onChange is a function that takes an event as an argument
            // and sets the title state to the value of the input
            // e.target.value is the value of the input
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        {/* Comany Email input field */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="text"
            value={email}
            // onChange is a function that takes an event as an argument
            // and sets the title state to the value of the input
            // e.target.value is the value of the input
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        {/* Comany Phone Number input field */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Phone</label>
          <input
            type="text"
            value={phone}
            // onChange is a function that takes an event as an argument
            // and sets the title state to the value of the input
            // e.target.value is the value of the input
            onChange={(e) => setPhone(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Start Year</label>
          <input
            type="number"
            value={startYear}
            // onChange is a function that takes an event as an argument
            // and sets the title state to the value of the input
            // e.target.value is the value of the input
            onChange={(e) => setStartYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <div className="mb-4">
            <label className="text-xl mr-4 text-gray-500">Owners</label>
          </div>
          <ul className="mb-4">
            {owners.map((owner, index) => {
              return (
                <div className="mb-4" key={owner._id + index}>
                  <li>
                    <ul>
                      <li>
                        <VscMention className="inline" />
                        {owner.username}
                      </li>
                      <li>
                        <VscPerson className="inline" /> {owner.firstName}{" "}
                        {owner.lastName}
                      </li>
                      <li>
                        <VscMail className="inline" /> {owner.email}
                      </li>
                    </ul>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
        <UserSearch handleAddUserAsCompanyOwner={handleAddUserAsCompanyOwner} />
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg mx-auto w-1/2"
          onClick={handleEditCompany}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditCompany;

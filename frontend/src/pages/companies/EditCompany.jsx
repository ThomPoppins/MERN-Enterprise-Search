import React, { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL, TEST_KVK_API } from "../../../config.js";
import { useSnackbar } from "notistack";
import companyNameValidator from "../../utils/validation/companyNameValidator";
import emailValidator from "../../utils/validation/emailValidator";
import phoneNumberValidator from "../../utils/validation/phoneNumberValidator";
import kvkNumberValidator from "../../utils/validation/kvkNumberValidator";
import companySloganValidator from "../../utils/validation/companySloganValidator";
import companyDescriptionValidator from "../../utils/validation/companyDescriptionValidator";
import startYearValidator from "../../utils/validation/startYearValidator";
import UserSearch from "../../components/UserSearch";
import { VscMention, VscPerson, VscMail } from "react-icons/vsc";
import { useSelector } from "react-redux";
import CompanyLogoModal from "../../components/companies/CompanyLogoModal";

const EditCompany = () => {
  // ADD OWNERS TO COMPANY TICKETS:
  // TODO: [MERNSTACK-129] Add state for all companies fields that can be edited

  // Get the companyId from the URL
  const { id } = useParams();
  const companyId = id;

  // Get the userId from the Redux store
  const userId = useSelector((state) => state.userId);

  // Input field values for editing a company as state
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [kvkNumber, setKvkNumber] = useState("");
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");
  const [startYear, setStartYear] = useState(0);

  // Error state for displaying error messages if the user enters invalid input
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [kvkNumberError, setKvkNumberError] = useState(false);
  const [sloganError, setSloganError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [startYearError, setStartYearError] = useState(false);

  // Specific error messages to display when the user enters invalid input
  const [kvkNumberErrorMessage, setKvkNumberErrorMessage] = useState("");

  // Owners state
  const [owners, setOwners] = useState([]);

  // Removed owners ids
  const [removedOwnersIds, setRemovedOwnersIds] = useState([]);

  // Set showLogoModal to true to show the modal for uploading a company logo
  const [showLogoModal, setShowLogoModal] = useState(false);

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

  // Validation functions for validating the input fields and put a red border around the input field if the input is invalid
  // and display an error message under the input field explaining the right format
  const validateCompanyName = () => {
    if (!companyNameValidator(name)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };
  const validateEmail = () => {
    if (!emailValidator(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const validatePhone = () => {
    if (!phoneNumberValidator(phone, "NL")) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };
  const validateKvkNumber = async () => {
    if (!(await kvkNumberValidator(kvkNumber))) {
      setKvkNumberError(true);
      throw new Error("Invalid KVK number!");
    } else {
      setKvkNumberError(false);
    }
  };
  const validateSlogan = () => {
    if (!companySloganValidator(slogan)) {
      setSloganError(true);
    } else {
      setSloganError(false);
    }
  };
  const validateDescription = () => {
    if (!companyDescriptionValidator(description)) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  };
  const validateStartYear = () => {
    if (!startYearValidator(startYear)) {
      setStartYearError(true);
    } else {
      setStartYearError(false);
    }
  };

  // Handle onChange events for all input fields
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (nameError) {
      validateCompanyName();
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail();
    }
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (phoneError) {
      validatePhone();
    }
  };
  const handleKvkNumberChange = async (e) => {
    setKvkNumber(e.target.value);
    if (kvkNumberError) {
      await validateKvkNumber();
    }
  };
  const handleSloganChange = (e) => {
    setSlogan(e.target.value);
    if (sloganError) {
      validateSlogan();
    }
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (descriptionError) {
      validateDescription();
    }
  };
  const handleStartYearChange = (e) => {
    setStartYear(e.target.value);
    if (startYearError) {
      validateStartYear();
    }
  };

  // Display error messages when the user enters invalid input
  useEffect(() => {
    if (nameError) {
      enqueueSnackbar("Invalid company name!", { variant: "error" });
    }
    if (emailError) {
      enqueueSnackbar("Invalid email!", { variant: "error" });
    }
    if (phoneError) {
      enqueueSnackbar("Invalid phone number!", { variant: "error" });
    }
    if (kvkNumberError) {
      enqueueSnackbar("Invalid KVK number!", { variant: "error" });
    }
    if (sloganError) {
      enqueueSnackbar("Invalid slogan!", { variant: "error" });
    }
    if (descriptionError) {
      enqueueSnackbar("Invalid description!", { variant: "error" });
    }
    if (startYearError) {
      enqueueSnackbar("Invalid start year!", { variant: "error" });
    }
  }, [
    nameError,
    emailError,
    phoneError,
    kvkNumberError,
    sloganError,
    descriptionError,
    startYearError,
  ]);

  // useEffect() is a hook that runs a function when the component is rendered
  useEffect(() => {
    setLoading(true);
    axios
      .get(BACKEND_URL + "/companies/" + companyId)
      .then((response) => {
        setLoading(false);
        // TODO: [MERNSTACK-131] Set state for all companies fields that can be edited
        setName(response.data.name);
        setLogo(response.data.logo);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setKvkNumber(response.data.kvkNumber);
        setSlogan(response.data.slogan);
        setDescription(response.data.description);
        setStartYear(response.data.startYear);

        console.log("response.data: ", response.data);

        // Set owners
        const userIds = [];
        response.data.owners.forEach((owner) => {
          userIds.push(owner.userId);
        });
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
  const handleEditCompany = async () => {
    // Validate all fields before sending the request to the backend, otherwise return
    validateCompanyName();
    validateEmail();
    validatePhone();
    try {
      await validateKvkNumber();
    } catch (error) {
      enqueueSnackbar("Error validating KVK number!", { variant: "error" });
      console.log(error);
      return;
    }
    validateSlogan();
    validateDescription();
    validateStartYear();
    if (
      nameError ||
      emailError ||
      phoneError ||
      kvkNumberError ||
      sloganError ||
      descriptionError ||
      startYearError ||
      !name ||
      !email ||
      !phone ||
      !kvkNumber ||
      !slogan ||
      !description ||
      !startYear
    ) {
      enqueueSnackbar(
        "Please fill in all fields correctly before saving this company!",
        { variant: "error" }
      );
      return;
    }

    const data = {
      name: name,
      logo: logo,
      email: email,
      phone: phone,
      kvkNumber: kvkNumber,
      slogan: slogan,
      description: description,
      startYear: startYear,
    };
    setLoading(true);
    axios
      .put(BACKEND_URL + `/companies/${companyId}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Company edited successfully!", { variant: "success" });
        navigate("/companies");
      })
      .catch((error) => {
        if (error.response.status === 409) {
          enqueueSnackbar("Company with this KVK number already exists!", {
            variant: "error",
          });
          setKvkNumberError(true);
          setKvkNumberErrorMessage(
            "Company with this KVK number already exists!"
          );
        }

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveUserAsCompanyOwner = (e) => {
    console.log(
      "handleRemoveUserAsCompanyOwner e.target.value: ",
      e.target.value
    );

    // Set removed owners to show up in the search results again
    setRemovedOwnersIds([...removedOwnersIds, e.target.value]);

    axios
      .put(
        BACKEND_URL +
          "/companies/" +
          companyId +
          "/remove-owner/" +
          e.target.value
      )
      .then((response) => {
        console.log(
          "handleRemoveUserAsCompanyOwner response.data: ",
          response.data
        );
        console.log(
          "handleRemoveUserAsCompanyOwner response.data.owners: ",
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
            console.log(
              "ownersData in removeUserAsOwner function: ",
              ownersData
            );
            setOwners(ownersData);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  return (
    <div className="p-4">
      <BackButton destination={"/companies"} />
      <h1 className="text-3xl my-4">Edit Company</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto mb-4">
        <div className="my-4">
          <div className="mb-4">
            <label className="text-xl mr-4 text-gray-500">Owners</label>
          </div>
          <ul className="mb-4">
            {owners.map((owner, index) => {
              return (
                <div
                  className="mb-4 flex justify-between items-center"
                  key={owner._id + index}
                >
                  <div>
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
                  <div>
                    {owner._id !== userId ? (
                      <button
                        className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg mx-auto mb-4"
                        value={owner._id}
                        onClick={handleRemoveUserAsCompanyOwner}
                      >
                        Remove
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <UserSearch
          companyId={companyId}
          handleAddUserAsCompanyOwner={handleAddUserAsCompanyOwner}
          removedOwnersIds={removedOwnersIds}
        />
      </div>
      {/* TODO: [MERNSTACK-194] Make <CompanyRegisterEditForm company={company} /> component and use it in EditCompany.jsx and RegisterCompany.jsx */}
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
            onChange={handleNameChange}
            onBlur={validateCompanyName}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              nameError ? "border-red-500" : ""
            }`}
          />
          {nameError ? (
            <p className="text-red-500 text-sm">
              Company name must be between 1 and 60 characters long and can only
              contain letters, numbers, spaces, and the following characters: -,
              ', and .
            </p>
          ) : (
            ""
          )}
        </div>
        {/* Company logo */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Logo</label>
          <div className="w-full">
            <div className="flex justify-center items-center my-4">
              <div className="flex justify-center">
                {logo && (
                  <img src={logo} alt="Preview" width="200" height="200" />
                )}
              </div>
            </div>
            <div className="flex justify-center items-center mb-4 mt-8">
              <button
                className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                onClick={() => setShowLogoModal(true)}
              >
                Upload Logo
              </button>
            </div>
            {showLogoModal && (
              <CompanyLogoModal
                setLogo={setLogo}
                onClose={() => setShowLogoModal(false)}
              />
            )}
          </div>
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
            onChange={handleEmailChange}
            onBlur={validateEmail}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              emailError ? "border-red-500" : ""
            }`}
          />
          {emailError ? (
            <p className="text-red-500 text-sm">
              Email must be a valid email address.
            </p>
          ) : (
            ""
          )}
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
            onChange={handlePhoneChange}
            onBlur={validatePhone}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              phoneError ? "border-red-500" : ""
            }`}
          />
          {phoneError ? (
            <p className="text-red-500 text-sm">
              Phone number must be a valid phone number.
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">KVK number</label>
          {TEST_KVK_API ? (
            <div className="mb-4">
              <p className="text-gray-400">
                <strong>Note:</strong> Use KVK numbers from{" "}
                <a
                  className="text-blue-600"
                  href="https://developers.kvk.nl/documentation/testing"
                >
                  this page
                </a>
              </p>
            </div>
          ) : (
            ""
          )}
          <input
            type="text"
            value={kvkNumber}
            // onChange is a function that takes an event as an argument
            // and sets the title state to the value of the input
            // e.target.value is the value of the input
            onChange={handleKvkNumberChange}
            onBlur={validateKvkNumber}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              kvkNumberError ? "border-red-500" : ""
            }`}
          />
          {kvkNumberError ? (
            <p className="text-red-500 text-sm">
              {kvkNumberErrorMessage
                ? kvkNumberErrorMessage
                : "Must be a valid KVK number."}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Slogan</label>
          <input
            type="text"
            value={slogan}
            // onChange is a function that takes an event as an argument
            // and sets the name state to the value of the input
            // e.target.value is the value of the input
            onChange={handleSloganChange}
            onBlur={validateSlogan}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              startYearError ? "border-red-500" : ""
            }`}
          />
          {sloganError ? (
            <p className="text-red-500 text-sm">
              This should be the motto of your company. It must be between 1 and
              90 characters long.
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Company Description
          </label>
          <textarea
            type="text"
            value={description}
            // onChange is a function that takes an event as an argument
            // and sets the name state to the value of the input
            // e.target.value is the value of the input
            onChange={handleDescriptionChange}
            onBlur={validateDescription}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              startYearError ? "border-red-500" : ""
            }`}
          />
          {descriptionError ? (
            <p className="text-red-500 text-sm">
              This should be the description of your company. It must be between
              1 and 280 characters long.
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Start Year</label>
          <input
            type="number"
            value={startYear}
            // onChange is a function that takes an event as an argument
            // and sets the title state to the value of the input
            // e.target.value is the value of the input
            onChange={handleStartYearChange}
            onBlur={validateStartYear}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              startYearError ? "border-red-500" : ""
            }`}
          />
          {startYearError ? (
            <p className="text-red-500 text-sm">
              Start year must be a valid year and never can be later then the
              current year. If company hasn't started yet, register company when
              it starts.
            </p>
          ) : (
            ""
          )}
        </div>
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

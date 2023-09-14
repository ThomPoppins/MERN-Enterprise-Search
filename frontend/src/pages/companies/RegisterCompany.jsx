import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../config.js";
import { useSnackbar } from "notistack";
import companyNameValidator from "../../validation/companyNameValidator";
import phoneNumberValidator from "../../validation/phoneNumberValidator";
import emailValidator from "../../validation/emailValidator";
import startYearValidator from "../../validation/startYearValidator";
import { useSelector } from "react-redux";

const RegisterCompany = () => {
  // TODO: [MERNSTACK-127] Add state for all companies fields that can be registered
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [startYear, setStartYear] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();
  // useSnackbar is a hook that returns an object with two properties: enqueueSnackbar and closeSnackbar
  // enqueueSnackbar is a function that takes an object as an argument
  // and displays a snackbar with the message and the variant that we pass in the object
  // closeSnackbar is a function that takes an id as an argument and closes the snackbar with that id
  // https://iamhosseindhv.com/notistack/demos#use-snackbar
  const { enqueueSnackbar } = useSnackbar();

  let invalidValues = false;

  // TODO: [MERNSTACK-159] Give input field of the form a red border if the input is invalid
  // TODO: [MERNSTACK-160] Display error message under the input field if the input is invalid explaining the right format
  const handleSaveCompany = () => {
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

    // TODO: [MERNSTACK-167] Add KVK number to the form
    // TODO: [MERNSTACK-166] Validate validity and uniqueness of company KVK number

    const data = {
      // TODO: [MERNSTACK-132] Add all companies fields that can be registered
      name: name,
      email: email,
      phone: phone,
      startYear: startYear,
      owners: [{ userId: userId }], // Make sure that the user that registers the company is added as an owner
    };
    setLoading(true);
    axios
      .post(BACKEND_URL + "/companies", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Company registered successfully!", {
          variant: "success",
        });
        navigate("/companies");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error registering company!", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination={"/companies"} />
      <h1 className="text-3xl my-4">Register Company</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {/* // TODO: [MERNSTACK-128] RegisterCompany.jsx: Add form inputs of all fields that the owner should fill in to register a company. Copy paste the following outer div with .my-4 class to achieve this*/}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            // onChange is a function that takes an event as an argument
            // and sets the name state to the value of the input
            // e.target.value is the value of the input
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="text"
            value={email}
            // onChange is a function that takes an event as an argument
            // and sets the name state to the value of the input
            // e.target.value is the value of the input
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Phone</label>
          <input
            type="text"
            value={phone}
            // onChange is a function that takes an event as an argument
            // and sets the name state to the value of the input
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
            // and sets the name state to the value of the input
            // e.target.value is the value of the input
            onChange={(e) => setStartYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveCompany}>
          Save
        </button>
      </div>
    </div>
  );
};

export default RegisterCompany;

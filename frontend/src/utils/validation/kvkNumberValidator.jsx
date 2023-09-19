import axios from "axios";
import { BACKEND_URL, TEST_KVK_API } from "../../../config.js";

const kvkNumberValidator = async (kvkNumber) => {
  const regex = /^[0-9]{8}$/;
  const validNumberFormat = regex.test(kvkNumber);
  let apiCallValidated = false;

  if (!validNumberFormat) {
    return false;
  }
  if (!TEST_KVK_API) {
    return validNumberFormat;
  }

  // TODO: Remove this line when API call is implemented
  await axios
    .get(BACKEND_URL + "/kvk", {
      params: {
        kvkNumber: kvkNumber,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("kvkNumberValidator Axios response: ", response);
        apiCallValidated = true;
      }
    })
    .catch((error) => {
      if (error.response.status === 400) {
        apiCallValidated = false;
        return false;
      }
      console.log(
        "ERROR from kvkNumberValidator Axios call to backend: ",
        error
      );
    });

  return validNumberFormat && apiCallValidated;
};

export default kvkNumberValidator;
